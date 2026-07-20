"use client";

import React, { useState, useEffect } from "react";
import { Edit2, Check, X } from "lucide-react";

interface EditableTextProps {
  contentKey: string;
  defaultText: string;
  isAdmin: boolean;
}

export default function EditableText({ contentKey, defaultText, isAdmin }: EditableTextProps) {
  const [content, setContent] = useState(defaultText);
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(defaultText);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/content/${contentKey}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.content) setContent(data.content);
      })
      .catch(() => {});
  }, [contentKey]);

  const handleSave = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/content/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content_key: contentKey,
          content_value: tempValue,
          admin_secret: "akademia-secret-admin-123",
        }),
      });

      if (res.ok) {
        setContent(tempValue);
        setIsEditing(false);
      } else {
        alert("Unauthorized or update failed.");
      }
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  if (isEditing) {
    return (
      <span className="inline-flex items-center gap-2 my-1">
        <input
          type="text"
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          className="bg-gray-900 border border-indigo-500 rounded px-2 py-1 text-sm text-white focus:outline-none"
        />
        <button onClick={handleSave} className="p-1 bg-emerald-600 hover:bg-emerald-500 rounded text-white" title="Save">
          <Check className="w-4 h-4" />
        </button>
        <button onClick={() => setIsEditing(false)} className="p-1 bg-gray-700 hover:bg-gray-600 rounded text-white" title="Cancel">
          <X className="w-4 h-4" />
        </button>
      </span>
    );
  }

  return (
    <span className="relative group inline-block">
      {content}
      {isAdmin && (
        <button
          onClick={() => { setTempValue(content); setIsEditing(true); }}
          className="absolute -top-3 -right-6 p-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow"
          title="Edit text (Admin)"
        >
          <Edit2 className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}
