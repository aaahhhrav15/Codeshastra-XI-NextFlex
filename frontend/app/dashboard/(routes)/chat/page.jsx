"use client"

import { useEffect, useState } from "react"
import AgoraRTC, { createClient } from "agora-rtc-sdk-ng"
import { VideoPlayer } from "./components/VideoPlayer" 

const APP_ID = "8d7ce771c337496bac4e61c8860fea32" 

AgoraRTC.setLogLevel(4)

let agoraCommandQueue = Promise.resolve()


const createAgoraClient = ({ onVideoTrack, onUserDisconnected }) => {
  const client = createClient({
    mode: "rtc",
    codec: "vp8",
  })

  let tracks

  const waitForConnectionState = (connectionState) => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (client.connectionState === connectionState) {
          clearInterval(interval)
          resolve()
        }
      }, 200)
    })
  }

  const connect = async (channel, token) => {
    await waitForConnectionState("DISCONNECTED")
    const uid = await client.join(APP_ID, channel, token, null)

    client.on("user-published", (user, mediaType) => {
      client.subscribe(user, mediaType).then(() => {
        if (mediaType === "video") {
          onVideoTrack(user)
        }
      })
    })

    client.on("user-left", (user) => {
      onUserDisconnected(user)
    })

    
    tracks = await AgoraRTC.createMicrophoneAndCameraTracks()

    
    await client.publish(tracks)

    return {
      tracks,
      uid,
    }
  }

  const disconnect = async () => {
    await waitForConnectionState("CONNECTED")
    client.removeAllListeners()
    if (tracks) {
      for (const track of tracks) {
        track.stop()
        track.close()
      }
      await client.unpublish(tracks)
    }
    await client.leave()
  }

  return {
    disconnect,
    connect,
  }
}


const tokens = [
  [
    "007eJxTYNgutzz++3v/3fZXeuXOr+7Kl0gNEGRgD/1tWeo+5+OWzYUKDBYp5smp5uaGycbG5iaWZkmJySapZobJFhZmBmmpicZG86I3pjcEMjJMnlzEzMgAgSA+P0NafmlRSUZYZkpqvnNiTg4DAwDWICQH",
    "fourthVideoCall",
  ],
]


const getRandomToken = () => {
  const randomIndex = Math.floor(Math.random() * tokens.length)
  return tokens[0]
}

const VideoRoom1 = () => {
  const [users, setUsers] = useState([])
  const [uid, setUid] = useState(null)
  const [channel, setChannel] = useState("")
  const [isInRoom, setIsInRoom] = useState(false)
  const [client, setClient] = useState(null)

  useEffect(() => {
    const onVideoTrack = (user) => {
      setUsers((previousUsers) => [...previousUsers, user])
    }

    const onUserDisconnected = (user) => {
      setUsers((previousUsers) =>
        previousUsers.filter((u) => u.uid !== user.uid)
      )
    }

    const newClient = createAgoraClient({
      onVideoTrack,
      onUserDisconnected,
    })

    setClient(newClient)

    return () => {
      if (isInRoom && newClient) {
        agoraCommandQueue = agoraCommandQueue.then(() => newClient.disconnect())
      }
    }
  }, [isInRoom])

  const createAndJoinRoom = async () => {
    try {
      const t = getRandomToken()
      const newChannel = t[1]
      const token = t[0]

      const { tracks, uid } = await client.connect(newChannel, token)
      setUid(uid)
      setChannel(newChannel)
      setUsers((previousUsers) => [
        ...previousUsers,
        {
          uid,
          audioTrack: tracks[0],
          videoTrack: tracks[1],
        },
      ])
      setIsInRoom(true)
    } catch (error) {
      console.error("Failed to create and join room:", error)
      alert("Failed to create and join room. Please try again.")
    }
  }

  const joinRoom = async () => {
    if (!channel) {
      alert("Please enter a channel name")
      return
    }

    try {
      const t = getRandomToken()
      const token = t[0] 
      const { tracks, uid } = await client.connect(channel, token)
      setUid(uid)
      setUsers((previousUsers) => [
        ...previousUsers,
        {
          uid,
          audioTrack: tracks[0],
          videoTrack: tracks[1],
        },
      ])
      setIsInRoom(true)
    } catch (error) {
      console.error("Failed to join room:", error)
      alert("Failed to join room. Please check your channel name.")
    }
  }

  const exitRoom = async () => {
    try {
      if (client) {
        await client.disconnect()
      }
      setUid(null)
      setUsers([])
      setIsInRoom(false)
      setChannel("")
    } catch (error) {
      console.error("Failed to exit room:", error)
      alert("Error exiting the room. Please try again.")
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full space-y-6">
      {!isInRoom ? (
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center">
            Video Meeting
          </h1>
          <div className="flex flex-col space-y-4">
            <button
              onClick={createAndJoinRoom}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition duration-200"
            >
              Create and Join Room
            </button>
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="Enter channel name"
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="flex-1 p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-100"
              />
              <button
                onClick={joinRoom}
                className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition duration-200"
              >
                Join Room
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-medium text-gray-800 dark:text-gray-100">
                Channel: <span className="font-bold">{channel}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Your UID: <span className="font-medium">{uid}</span>
              </p>
            </div>
            <button
              onClick={exitRoom}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg transition duration-200"
            >
              Exit Room
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {users.map((user) => (
              <VideoPlayer key={user.uid} user={user} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function VideoRoom() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <header className="flex items-center justify-between max-w-4xl mx-auto p-4">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            My Video App
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 py-2 px-4 rounded transition-colors duration-300"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </header>
        <main className="flex justify-center px-4">
          <VideoRoom1 />
        </main>
      </div>
    </div>
  )
}
