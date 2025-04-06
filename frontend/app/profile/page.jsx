"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthContext";
import { motion } from "framer-motion";
import { User, Mail, BadgeInfo } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { token, user } = useAuth();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FAF1EF]">
        <div className="text-center text-gray-600 text-lg">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF1EF] p-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#DFD0D0] max-w-md w-full p-8 rounded-2xl shadow-xl"
      >
        <h1 className="text-3xl font-bold text-[#4B3F3F] mb-6 text-center">Your Profile</h1>
        <div className="space-y-4">
          <InfoRow icon={<User className="text-[#6B4C4C]" />} label="Username" value={user.username} />
          <InfoRow icon={<Mail className="text-[#6B4C4C]" />} label="Email" value={user.email} />
          <InfoRow icon={<BadgeInfo className="text-[#6B4C4C]" />} label="User ID" value={user._id} />
        </div>
      </motion.div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center space-x-4 bg-[#FAF1EF] px-4 py-3 rounded-lg border border-[#E6CCCC]">
      <div>{icon}</div>
      <div>
        <p className="text-sm text-[#7B5E5E]">{label}</p>
        <p className="text-base font-semibold text-[#3E2F2F]">{value}</p>
      </div>
    </div>
  );
}
