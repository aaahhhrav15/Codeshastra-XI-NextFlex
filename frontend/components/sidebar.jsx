"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"


export function Sidebar({ userEmail }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    // In a real app, you'd fetch this from your backend
    // For this example, we'll use localStorage to simulate stored users
    const storedUsers = localStorage.getItem("users")
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers))
    }
    // Add current user if not already in the list
    if (!storedUsers || !JSON.parse(storedUsers).includes(userEmail)) {
      const updatedUsers = storedUsers ? [...JSON.parse(storedUsers), userEmail] : [userEmail]
      localStorage.setItem("users", JSON.stringify(updatedUsers))
      setUsers(updatedUsers)
    }
  }, [userEmail])

  return (
    <div className="w-64 bg-white border-r">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Chat App</h2>
        <p className="mb-4">Logged in as: {userEmail}</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              Connect <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {users
              .filter((email) => email !== userEmail)
              .map((email) => (
                <DropdownMenuItem key={email}>{email}</DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

