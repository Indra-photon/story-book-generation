// Profile.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { User, Edit, Save, X, Upload, Clock, Image, Zap } from 'lucide-react';

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: ''
  });
  const [characterStats, setCharacterStats] = useState({
    total: 0,
    thisMonth: 0,
    remaining: 0
  });

  // Format date to readable string
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Get subscription tier name with proper formatting
  const getSubscriptionTierName = (tier) => {
    if (!tier) return 'Free';
    
    switch(tier) {
      case 'free': return 'Free';
      case 'pro': return 'Pro';
      case 'business': return 'Business';
      default: return tier.charAt(0).toUpperCase() + tier.slice(1);
    }
  };

  // Get proper badge color based on subscription tier
  const getTierBadgeColor = (tier) => {
    switch(tier) {
      case 'free': return 'bg-gray-200 text-gray-800';
      case 'pro': return 'bg-primary-500 text-white';
      case 'business': return 'bg-accent text-dark';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  // Format remaining days for subscription
  const getRemainingDays = (expiryDate) => {
    if (!expiryDate) return 'N/A';
    
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  };

  // Initialize component with user data
  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.username || '',
        fullname: userData.fullName || userData.fullname || '',
        email: userData.email || '',
      });
      
      setAvatarPreview(userData.avatar || '');
      
      // Set character usage statistics
      setCharacterStats({
        total: userData.totalCharactersCreated || 0,
        thisMonth: userData.generationLimits?.charactersThisPeriod || 0,
        remaining: (userData.generationLimits?.maxCharacters || 3) - (userData.generationLimits?.charactersThisPeriod || 0)
      });
    }
  }, [userData]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle avatar file selection
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Update profile information
      const profileResponse = await axios.patch(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/users/update-account`,
        {
          username: formData.username,
          fullname: formData.fullname,
          email: formData.email
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );
      
      // Update avatar if changed
      if (avatar) {
        const avatarFormData = new FormData();
        avatarFormData.append('avatar', avatar);
        
        const avatarResponse = await axios.patch(
          `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/users/update-avatar`,
          avatarFormData,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
      }
      
      // Update Redux state with new user data
      // This would depend on your actual auth action creators
      // dispatch(updateUserSuccess(profileResponse.data.data));
      
      toast.success('Profile updated successfully!');
      setEditMode(false);
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  // Get progress percentage for character usage
  const getUsagePercentage = () => {
    const max = userData?.generationLimits?.maxCharacters || 3;
    const used = userData?.generationLimits?.charactersThisPeriod || 0;
    return Math.min(Math.round((used / max) * 100), 100);
  };

  return (
    <div className="min-h-screen bg-light py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-chewy text-dark mb-8">My Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: User details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="relative mb-6 md:mb-0 md:mr-8">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-200">
                      {avatarPreview ? (
                        <img 
                          src={avatarPreview} 
                          alt="User avatar" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-500">
                          <User size={48} />
                        </div>
                      )}
                    </div>
                    
                    {editMode && (
                      <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-accent text-dark rounded-full p-2 cursor-pointer shadow-md hover:bg-accent/80 transition-colors">
                        <Upload size={16} />
                        <input 
                          type="file" 
                          id="avatar-upload" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleAvatarChange}
                        />
                      </label>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-dark">{userData?.fullname || userData?.fullName || 'User'}</h2>
                        <p className="text-gray-500">@{userData?.username || 'username'}</p>
                      </div>
                      
                      <div>
                        {!editMode ? (
                          <button 
                            onClick={() => setEditMode(true)} 
                            className="text-primary-500 hover:text-primary-600 flex items-center gap-1"
                          >
                            <Edit size={16} />
                            <span>Edit</span>
                          </button>
                        ) : (
                          <div className="flex gap-2">
                            <button 
                              onClick={() => setEditMode(false)} 
                              className="text-gray-500 hover:text-gray-600 flex items-center gap-1"
                            >
                              <X size={16} />
                              <span>Cancel</span>
                            </button>
                            <button 
                              onClick={handleSubmit} 
                              className="text-primary-500 hover:text-primary-600 flex items-center gap-1"
                              disabled={loading}
                            >
                              <Save size={16} />
                              <span>{loading ? 'Saving...' : 'Save'}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                          {editMode ? (
                            <input 
                              type="text" 
                              name="username" 
                              value={formData.username} 
                              onChange={handleChange} 
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                              disabled={loading}
                            />
                          ) : (
                            <p className="text-gray-800">{formData.username}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          {editMode ? (
                            <input 
                              type="text" 
                              name="fullname" 
                              value={formData.fullname} 
                              onChange={handleChange} 
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                              disabled={loading}
                            />
                          ) : (
                            <p className="text-gray-800">{formData.fullname}</p>
                          )}
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          {editMode ? (
                            <input 
                              type="email" 
                              name="email" 
                              value={formData.email} 
                              onChange={handleChange} 
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                              disabled={loading}
                            />
                          ) : (
                            <p className="text-gray-800">{formData.email}</p>
                          )}
                        </div>
                      </div>
                    </form>
                    
                    <div className="mt-6 border-t pt-6">
                      <h3 className="text-lg font-bold text-dark mb-4">Account Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Member Since</p>
                          <p className="text-gray-800">{formatDate(userData?.createdAt)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Last Login</p>
                          <p className="text-gray-800">{formatDate(userData?.lastLoginDate)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column: Subscription and stats */}
          <div className="space-y-6">
            {/* Subscription information */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-primary p-6">
                <h3 className="text-xl font-chewy text-white mb-2">Subscription</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getTierBadgeColor(userData?.subscription?.tier || 'free')}`}>
                      {getSubscriptionTierName(userData?.subscription?.tier)}
                    </span>
                  </div>
                  <div>
                    <button className="bg-accent text-dark font-bold px-4 py-2 rounded-full text-sm hover:bg-accent/90 transition-colors">
                      {userData?.subscription?.tier === 'free' ? 'Upgrade' : 'Manage'}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <p className="text-gray-800 font-medium">
                    {userData?.subscription?.status === 'active' ? 
                      <span className="text-green-600">Active</span> : 
                      <span className="text-gray-600">Inactive</span>
                    }
                  </p>
                </div>
                
                {userData?.subscription?.tier !== 'free' && (
                  <>
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Billing Cycle</p>
                      <p className="text-gray-800 font-medium">
                        {formatDate(userData?.subscription?.startDate)} - {formatDate(userData?.subscription?.expiryDate)}
                      </p>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Remaining Days</p>
                      <div className="flex items-center">
                        <Clock size={16} className="text-primary-500 mr-1" />
                        <span className="text-gray-800 font-medium">
                          {getRemainingDays(userData?.subscription?.expiryDate)} days
                        </span>
                      </div>
                    </div>
                  </>
                )}
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Features</p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mr-2">
                        <span className="text-dark text-xs font-bold">✓</span>
                      </div>
                      <span className="text-gray-700">
                        {userData?.subscription?.tier === 'free' ? 'Basic animations' : 'Advanced animations'}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mr-2">
                        <span className="text-dark text-xs font-bold">✓</span>
                      </div>
                      <span className="text-gray-700">
                        {userData?.subscription?.tier === 'free' ? 'GIF exports' : 'Multiple export formats'}
                      </span>
                    </li>
                    {userData?.subscription?.tier !== 'free' && (
                      <li className="flex items-center">
                        <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mr-2">
                          <span className="text-dark text-xs font-bold">✓</span>
                        </div>
                        <span className="text-gray-700">Commercial usage rights</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Character usage stats */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-6">
              <h3 className="text-xl font-chewy text-dark mb-4">Character Usage</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Monthly Limit</span>
                    <span className="text-sm font-medium text-gray-700">
                      {characterStats.thisMonth} / {userData?.generationLimits?.maxCharacters || 3}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full" 
                      style={{ width: `${getUsagePercentage()}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-dark">{characterStats.remaining}</p>
                    <p className="text-sm text-gray-500">Characters Remaining</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-dark">{characterStats.total}</p>
                    <p className="text-sm text-gray-500">Total Created</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-gray-500 text-sm mb-3">Next reset: {formatDate(userData?.generationLimits?.periodResetDate)}</p>
                  <a href="/characters/new" className="inline-flex items-center justify-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-full hover:bg-primary-600 transition-colors">
                    <Image size={16} />
                    <span>Create New Character</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;