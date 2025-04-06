"use client"

import React, {
    useEffect,
    useLayoutEffect,
    useRef,
  } from 'react';
  
  export const VideoPlayer = ({ user }) => {
    const ref = useRef();
  
    useEffect(() => {
      user.videoTrack.play(ref.current);
    }, []);
  
    return (
      <div>
        {/* Uid: {user.uid} */}
        <div
          ref={ref}
          style={{ width: '200px', height: '300px', borderRadius:'100px', overflow:"hidden" }}
        ></div>
      </div>
    );
  };
  