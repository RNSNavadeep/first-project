'use client';

import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    skinTone: '',
    bodySize: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  // 🔐 Protect page
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (!loggedIn) {
      window.location.href = '/login';
      return;
    }

    const saved = localStorage.getItem('userProfile');
    if (saved) {
      const data = JSON.parse(saved);
      setProfile(data);
      setFormData(data);
    }
  }, []);

  const skinColors = [
    '#F5E0D3', '#E8C39E', '#D9A78A', '#C98C76', '#B86F62',
    '#A5524E', '#8F3A3A', '#7A2525', '#651010', '#4F0000',
  ];

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(formData));
    setProfile(formData);
    setIsEditing(false);
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUser');
    window.location.href = '/login';
  };

  // ================= SAVED PROFILE =================
  if (profile && !isEditing) {
    return (
      <div className="min-h-screen bg-[#F2E9E4] flex justify-center p-6">
        <div className="bg-white w-full max-w-2xl p-10 rounded-xl shadow-xl border border-[#7B2CBF]/40">

          <h1 className="text-3xl font-bold text-center text-[#7B2CBF] mb-8">
            Your Profile
          </h1>

          <div className="space-y-3 text-gray-900 text-lg">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Age:</strong> {profile.age}</p>
            <p><strong>Gender:</strong> {profile.gender}</p>
            <p><strong>Body Size:</strong> {profile.bodySize}</p>

            <div className="flex items-center gap-3">
              <strong>Skin Tone:</strong>
              <span className="font-semibold">{profile.skinTone}</span>
              <span
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: skinColors[profile.skinTone - 1] }}
              />
            </div>

            <div className="pt-4">
              <strong>Delivery Address:</strong>
              <p className="mt-1 text-gray-800">{profile.address}</p>
              <p className="text-gray-800">
                {profile.city}, {profile.state} - {profile.pincode}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-4">
            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-[#7B2CBF] text-white py-3 rounded-lg font-semibold hover:bg-purple-800"
            >
              Edit Profile
            </button>

            <button
              onClick={logout}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= CREATE / EDIT PROFILE =================
  return (
    <div className="min-h-screen bg-[#F2E9E4] flex justify-center p-6">
      <div className="bg-white w-full max-w-2xl p-10 rounded-xl shadow-xl border border-[#7B2CBF]/40">

        <h1 className="text-3xl font-bold text-center text-[#7B2CBF] mb-8">
          {profile ? 'Edit Profile' : 'Create Profile'}
        </h1>

        <form onSubmit={handleSave} className="space-y-5 text-gray-900">

          <input name="name" value={formData.name} onChange={handleChange}
            placeholder="Full Name" required className="input" />

          <input name="age" type="number" value={formData.age} onChange={handleChange}
            placeholder="Age" required className="input" />

          <select name="gender" value={formData.gender} onChange={handleChange}
            required className="input">
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <select name="bodySize" value={formData.bodySize} onChange={handleChange}
            required className="input">
            <option value="">Body Size</option>
            <option>XS</option><option>S</option><option>M</option>
            <option>L</option><option>XL</option><option>XXL</option>
          </select>

          {/* Skin Tone */}
          <div>
            <p className="font-semibold mb-2">Skin Tone</p>
            <div className="grid grid-cols-5 gap-3">
              {skinColors.map((c, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setFormData({ ...formData, skinTone: String(i + 1) })}
                  className={`flex flex-col items-center p-2 rounded-lg
                    ${formData.skinTone == i + 1 ? 'ring-2 ring-[#7B2CBF]' : ''}`}
                >
                  <span className="w-9 h-9 rounded-full border" style={{ backgroundColor: c }} />
                  <span className="text-sm font-medium text-gray-800 mt-1">{i + 1}</span>
                </button>
              ))}
            </div>
          </div>

          <textarea name="address" value={formData.address} onChange={handleChange}
            placeholder="Full Address" required className="input h-24" />

          <div className="grid grid-cols-2 gap-4">
            <input name="city" value={formData.city} onChange={handleChange}
              placeholder="City" required className="input" />
            <input name="state" value={formData.state} onChange={handleChange}
              placeholder="State" required className="input" />
          </div>

          <input name="pincode" value={formData.pincode} onChange={handleChange}
            placeholder="Pincode" required className="input" />

          <button type="submit"
            className="w-full bg-[#7B2CBF] text-white py-4 rounded-lg font-semibold hover:bg-purple-800">
            Save Profile
          </button>
        </form>
      </div>

      {/* Input Style */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 14px;
          border: 2px solid #7B2CBF;
          border-radius: 12px;
          font-size: 16px;
          color: #111;
        }
        .input::placeholder {
          color: #555;
        }
      `}</style>
    </div>
  );
}





