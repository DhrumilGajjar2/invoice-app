import React, { useState, useEffect } from 'react';
import '../styles/main.css';

export default function Profile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    gstin: '',
    logo: ''
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('invoicegen-profile');
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('invoicegen-profile', JSON.stringify(profile));
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfile({ ...profile, logo: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ Profile saved!');
  };

  return (
    <div className="profile-container glass">
      <h2>Business Profile</h2>

      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Business/Owner Name</label>
          <input name="name" value={profile.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={profile.email} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input name="phone" value={profile.phone} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea name="address" value={profile.address} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>GSTIN / Tax ID</label>
          <input name="gstin" value={profile.gstin} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Upload Logo (optional)</label>
          <input type="file" accept="image/*" onChange={handleLogoUpload} />
        </div>

        {profile.logo && (
          <div className="preview-logo">
            <p>Preview:</p>
            <img src={profile.logo} alt="Logo Preview" height={80} />
          </div>
        )}

        <button type="submit" className="submit-btn">Save Profile</button>
      </form>
    </div>
  );
}
