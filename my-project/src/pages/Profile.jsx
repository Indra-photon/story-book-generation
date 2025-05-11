// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { User, Edit, Save, X, Upload, Clock, Zap, Book, CreditCard } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const Profile = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const userData = useSelector(state => state.auth.userData);
//   const authToken = useSelector(state => state.auth.token); // Get auth token from Redux store
//   const [loading, setLoading] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [avatar, setAvatar] = useState(null);
//   const [avatarPreview, setAvatarPreview] = useState('');
//   const [formData, setFormData] = useState({
//     username: '',
//     fullname: '',
//     email: ''
//   });
//   const [storyHistory, setStoryHistory] = useState([]);
//   const [loadingStories, setLoadingStories] = useState(false);

//   // Format date to readable string
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric' 
//     });
//   };

//   // Get subscription tier name with proper formatting
//   const getSubscriptionTierName = (tier) => {
//     if (!tier) return 'Free';
    
//     switch(tier) {
//       case 'free': return 'Free';
//       case 'basic': return 'Basic';
//       case 'premium': return 'Premium';
//       default: return tier.charAt(0).toUpperCase() + tier.slice(1);
//     }
//   };

//   // Get proper badge color based on subscription tier
//   const getTierBadgeColor = (tier) => {
//     switch(tier) {
//       case 'free': return 'bg-gray-200 text-gray-800';
//       case 'basic': return 'bg-primary-500 text-white';
//       case 'premium': return 'bg-accent text-dark';
//       default: return 'bg-gray-200 text-gray-800';
//     }
//   };

//   // Format remaining days for subscription
//   const getRemainingDays = (expiryDate) => {
//     if (!expiryDate) return 'N/A';
    
//     const now = new Date();
//     const expiry = new Date(expiryDate);
//     const diffTime = expiry - now;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
//     return diffDays > 0 ? diffDays : 0;
//   };

//   // Get tier information
//   const getTierTokenInfo = (tier) => {
//     switch(tier) {
//       case 'basic':
//         return {
//           initialTokens: 40,
//           maxTokens: 50,
//           price: '$25/month'
//         };
//       case 'premium':
//         return {
//           initialTokens: 80,
//           maxTokens: 100,
//           price: '$40/month'
//         };
//       case 'free':
//       default:
//         return {
//           initialTokens: 10,
//           maxTokens: 20,
//           price: 'Free'
//         };
//     }
//   };

//   // Fetch user stories
//   const fetchUserStories = async () => {
//     setLoadingStories(true);
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories/get-all-stories`,
//         {
//           withCredentials : true,
//           headers: {
//               "Content-Type": "application/json"
//           }
//         }
//       );
//       setStoryHistory(response.data.data);
//     } catch (error) {
//       console.error('Error fetching stories:', error);
//       toast.error('Failed to load story history');
//     } finally {
//       setLoadingStories(false);
//     }
//   };

//   // Initialize component with user data
//   useEffect(() => {
//     if (userData) {
//       setFormData({
//         username: userData.username || '',
//         fullname: userData.fullname || '',
//         email: userData.email || '',
//       });
      
//       setAvatarPreview(userData.avatar || '');
      
//       // Fetch user's stories
//       fetchUserStories();
//     }
//   }, [userData, authToken]);

//   // Handle form input changes
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Handle avatar file selection
//   const handleAvatarChange = (e) => {
//     const file = e.target.files[0];
    
//     if (file) {
//       setAvatar(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setAvatarPreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       // Update profile information
//       const profileResponse = await axios.patch(
//         `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/users/update-account`,
//         {
//           username: formData.username,
//           fullname: formData.fullname,
//           email: formData.email
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`
//           }
//         }
//       );
      
//       // Update avatar if changed
//       if (avatar) {
//         const avatarFormData = new FormData();
//         avatarFormData.append('avatar', avatar);
        
//         const avatarResponse = await axios.patch(
//           `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/users/update-avatar`,
//           avatarFormData,
//           {
//             headers: {
//               Authorization: `Bearer ${authToken}`,
//               'Content-Type': 'multipart/form-data'
//             }
//           }
//         );
//       }
      
//       // Update Redux state with new user data
//       // This would depend on your actual auth action creators
//       // dispatch(updateUserSuccess(profileResponse.data.data));
      
//       toast.success('Profile updated successfully!');
//       setEditMode(false);
//     } catch (error) {
//       console.error('Profile update error:', error);
//       toast.error(error.response?.data?.message || 'Failed to update profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle subscription upgrade
//   const handleSubscriptionUpgrade = (tier) => {
//     navigate(`/pricing?selected=${tier}`);
//   };

//   // Calculate potential story count from token balance
//   const getMaxStoryCount = (tokenBalance) => {
//     // Each story costs 7 tokens total (5 to generate + 2 to save)
//     return Math.floor(tokenBalance / 7);
//   };

//   return (
//     <div className="min-h-screen bg-light py-20 px-4">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl md:text-4xl font-chewy text-dark mb-8">My Profile</h1>
        
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left column: User details */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//               <div className="p-8">
//                 <div className="flex flex-col md:flex-row md:items-center">
//                   <div className="relative mb-6 md:mb-0 md:mr-8">
//                     <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-200">
//                       {avatarPreview ? (
//                         <img 
//                           src={avatarPreview} 
//                           alt="User avatar" 
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-500">
//                           <User size={48} />
//                         </div>
//                       )}
//                     </div>
                    
//                     {editMode && (
//                       <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-accent text-dark rounded-full p-2 cursor-pointer shadow-md hover:bg-accent/80 transition-colors">
//                         <Upload size={16} />
//                         <input 
//                           type="file" 
//                           id="avatar-upload" 
//                           accept="image/*" 
//                           className="hidden" 
//                           onChange={handleAvatarChange}
//                         />
//                       </label>
//                     )}
//                   </div>
                  
//                   <div className="flex-1">
//                     <div className="flex justify-between items-start mb-4">
//                       <div>
//                         <h2 className="text-2xl font-bold text-dark">{userData?.fullname || 'User'}</h2>
//                         <p className="text-gray-500">@{userData?.username || 'username'}</p>
//                         <div className="mt-1">
//                           <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getTierBadgeColor(userData?.subscription?.tier || 'free')}`}>
//                             {getSubscriptionTierName(userData?.subscription?.tier)} Plan
//                           </span>
//                         </div>
//                       </div>
                      
//                       <div>
//                         {!editMode ? (
//                           <button 
//                             onClick={() => setEditMode(true)} 
//                             className="text-primary-500 hover:text-primary-600 flex items-center gap-1"
//                           >
//                             <Edit size={16} />
//                             <span>Edit</span>
//                           </button>
//                         ) : (
//                           <div className="flex gap-2">
//                             <button 
//                               onClick={() => setEditMode(false)} 
//                               className="text-gray-500 hover:text-gray-600 flex items-center gap-1"
//                             >
//                               <X size={16} />
//                               <span>Cancel</span>
//                             </button>
//                             <button 
//                               onClick={handleSubmit} 
//                               className="text-primary-500 hover:text-primary-600 flex items-center gap-1"
//                               disabled={loading}
//                             >
//                               <Save size={16} />
//                               <span>{loading ? 'Saving...' : 'Save'}</span>
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     </div>
                    
//                     <form onSubmit={handleSubmit}>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
//                           {editMode ? (
//                             <input 
//                               type="text" 
//                               name="username" 
//                               value={formData.username} 
//                               onChange={handleChange} 
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500"
//                               disabled={loading}
//                             />
//                           ) : (
//                             <p className="text-gray-800">{formData.username}</p>
//                           )}
//                         </div>
                        
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//                           {editMode ? (
//                             <input 
//                               type="text" 
//                               name="fullname" 
//                               value={formData.fullname} 
//                               onChange={handleChange} 
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500"
//                               disabled={loading}
//                             />
//                           ) : (
//                             <p className="text-gray-800">{formData.fullname}</p>
//                           )}
//                         </div>
                        
//                         <div className="md:col-span-2">
//                           <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                           {editMode ? (
//                             <input 
//                               type="email" 
//                               name="email" 
//                               value={formData.email} 
//                               onChange={handleChange} 
//                               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500"
//                               disabled={loading}
//                             />
//                           ) : (
//                             <p className="text-gray-800">{formData.email}</p>
//                           )}
//                         </div>
//                       </div>
//                     </form>
                    
//                     <div className="mt-6 border-t pt-6">
//                       <h3 className="text-lg font-bold text-dark mb-4">Account Information</h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div>
//                           <p className="text-sm text-gray-500">Member Since</p>
//                           <p className="text-gray-800">{formatDate(userData?.createdAt)}</p>
//                         </div>
//                         <div>
//                           <p className="text-sm text-gray-500">Last Login</p>
//                           <p className="text-gray-800">{formatDate(userData?.lastLoginDate)}</p>
//                         </div>
//                         <div>
//                           <p className="text-sm text-gray-500">Email Verified</p>
//                           <div className="flex items-center gap-2">
//                             <p className="text-gray-800">
//                               {userData?.isEmailVerified ? 
//                                 <span className="text-green-600">Yes</span> : 
//                                 <span className="text-red-600">No</span>
//                               }
//                             </p>
//                             {!userData?.isEmailVerified && (
//                               <button
//                                 onClick={async () => {
//                                   try {
//                                     await axios.post(
//                                       `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/users/send-verification-email`,
//                                       {},
//                                       {
//                                         withCredentials: true,
//                                         headers: {
//                                           'Content-Type': 'application/json'
//                                         }
//                                       }
//                                     );
//                                     toast.success('Verification email sent! Please check your inbox.');
//                                   } catch (error) {
//                                     console.error('Error sending verification email:', error);
//                                     toast.error(error.response?.data?.message || 'Failed to send verification email');
//                                   }
//                                 }}
//                                 className="text-xs bg-primary-500 text-white px-2 py-1 rounded hover:bg-primary-600 transition-colors"
//                               >
//                                 Verify Now
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                         <div>
//                           <p className="text-sm text-gray-500">Total Stories Created</p>
//                           <p className="text-gray-800">{userData?.storiesCreated || 0}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Story History */}
//             <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-8">
//               <div className="bg-gradient-primary p-6">
//                 <h3 className="text-xl font-chewy text-white mb-0">My Story History</h3>
//                 {/* Optional: Add story count */}
//                 <p className="text-white text-sm">
//                   Total Stories: {storyHistory.metadata?.totalStories || 0}
//                 </p>
//               </div>
              
//               <div className="p-6">
//                 {loadingStories ? (
//                   <div className="text-center py-8">
//                     <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
//                     <p className="mt-2 text-gray-600">Loading stories...</p>
//                   </div>
//                 ) : storyHistory.stories && storyHistory.stories.length > 0 ? (
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full">
//                       <thead>
//                         <tr className="border-b">
//                           <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Title</th>
//                           <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Type</th>
//                           <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Created</th>
//                           <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
//                           <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {storyHistory.stories.map((story) => (
//                           <tr key={story._id} className="border-b hover:bg-gray-50">
//                             <td className="py-3 px-4 text-gray-800">{story.title}</td>
//                             <td className="py-3 px-4 text-gray-600 capitalize">{story.storyType}</td>
//                             <td className="py-3 px-4 text-gray-600">{formatDate(story.createdAt)}</td>
//                             <td className="py-3 px-4">
//                               <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${
//                                 story.status === 'published' ? 'bg-green-100 text-green-800' :
//                                 story.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
//                                 'bg-gray-100 text-gray-800'
//                               }`}>
//                                 {story.status.charAt(0).toUpperCase() + story.status.slice(1)}
//                               </span>
//                             </td>
//                             <td className="py-3 px-4">
//                             <button 
//                                 onClick={() => navigate(`/edit-story/${story._id}`)}
//                                 className="text-primary-500 hover:text-primary-600 text-sm font-medium"
//                               >
//                                 View/Edit
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>

//                     {/* Optional: Story Type Breakdown */}
//                     {storyHistory.metadata?.storyTypeCounts && (
//                       <div className="mt-6 border-t pt-4">
//                         <h4 className="text-md font-semibold text-gray-700 mb-3">Story Type Breakdown</h4>
//                         <div className="flex flex-wrap gap-2">
//                           {Object.entries(storyHistory.metadata.storyTypeCounts).map(([type, count]) => (
//                             <div 
//                               key={type} 
//                               className="bg-primary-50 px-3 py-2 rounded-full flex items-center"
//                             >
//                               <span className="text-primary-700 capitalize mr-2">{type}:</span>
//                               <span className="font-bold">{count}</span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="text-center py-10">
//                     <Book size={40} className="mx-auto text-gray-300 mb-3" />
//                     <p className="text-gray-500">You haven't created any stories yet</p>
//                     <button 
//                       onClick={() => navigate('/story-generator')}
//                       className="mt-4 inline-block bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
//                     >
//                       Create Your First Story
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
          
//           {/* Right column: Subscription and tokens */}
//           <div className="space-y-6">
//             {/* Token information */}
//             <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//               <div className="bg-gradient-primary p-6">
//                 <h3 className="text-xl font-chewy text-white mb-2">My Tokens</h3>
//                 <div className="flex items-center text-white">
//                   <Zap size={20} className="mr-2" />
//                   <span className="text-2xl font-bold">{userData?.tokens?.balance || 0}</span>
//                   <span className="text-sm ml-2 opacity-80">/ {userData?.tokens?.maxBalance || 20} max</span>
//                 </div>
//               </div>
              
//               <div className="p-6">
//                 <div className="mb-4">
//                   <div className="flex justify-between mb-2">
//                     <span className="text-sm font-medium text-gray-700">Token Balance</span>
//                     <span className="text-sm font-medium text-gray-700">
//                       {userData?.tokens?.balance || 0} / {userData?.tokens?.maxBalance || 20}
//                     </span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div 
//                       className="bg-primary-500 h-2 rounded-full" 
//                       style={{ width: `${Math.min(((userData?.tokens?.balance || 0) / (userData?.tokens?.maxBalance || 20)) * 100, 100)}%` }}
//                     ></div>
//                   </div>
//                 </div>
                
//                 <div className="mt-3 bg-primary-50 p-4 rounded-lg">
//                   <div className="flex items-start">
//                     <Zap size={18} className="text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
//                     <div>
//                       <p className="text-sm text-primary-600 font-medium">
//                         You can create approximately {getMaxStoryCount(userData?.tokens?.balance || 0)} stories with your current tokens
//                       </p>
//                       <p className="text-xs text-primary-500 mt-1">
//                         (5 tokens to generate + 2 tokens to save)
//                       </p>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="mt-6">
//                   <h4 className="text-md font-medium text-gray-800 mb-3">Token Usage History</h4>
//                   {userData?.tokenHistory && userData.tokenHistory.length > 0 ? (
//                     <div className="max-h-48 overflow-y-auto">
//                       {userData.tokenHistory.slice(0, 5).map((entry, index) => (
//                         <div key={index} className="py-2 border-b last:border-b-0 flex justify-between">
//                           <div>
//                             <p className="text-sm text-gray-800">{entry.description}</p>
//                             <p className="text-xs text-gray-500">{formatDate(entry.date)}</p>
//                           </div>
//                           <div className={`text-sm font-medium ${entry.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
//                             {entry.amount > 0 ? `+${entry.amount}` : entry.amount}
//                           </div>
//                         </div>
//                       ))}
//                       {userData.tokenHistory.length > 5 && (
//                         <div className="text-center mt-2">
//                           <button className="text-primary-500 text-sm hover:underline">
//                             View All History
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   ) : (
//                     <p className="text-sm text-gray-500 italic">No token usage history yet</p>
//                   )}
//                 </div>
//               </div>
//             </div>
            
//             {/* Subscription information */}
//             <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//               <div className="bg-gradient-primary p-6">
//                 <h3 className="text-xl font-chewy text-white mb-2">Subscription</h3>
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getTierBadgeColor(userData?.subscription?.tier || 'free')}`}>
//                       {getSubscriptionTierName(userData?.subscription?.tier)}
//                     </span>
//                   </div>
//                   <div>
//                     <button 
//                       onClick={() => navigate('/pricing')}
//                       className="bg-accent text-dark font-bold px-4 py-2 rounded-full text-sm hover:bg-accent/90 transition-colors"
//                     >
//                       {userData?.subscription?.tier === 'free' ? 'Upgrade' : 'Manage'}
//                     </button>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="p-6">
//                 <div className="mb-4">
//                   <p className="text-sm text-gray-500 mb-1">Status</p>
//                   <p className="text-gray-800 font-medium">
//                     {userData?.subscription?.status === 'active' ? 
//                       <span className="text-green-600">Active</span> : 
//                       <span className="text-gray-600">Inactive</span>
//                     }
//                   </p>
//                 </div>
                
//                 {userData?.subscription?.tier !== 'free' && (
//                   <>
//                     <div className="mb-4">
//                       <p className="text-sm text-gray-500 mb-1">Billing Cycle</p>
//                       <p className="text-gray-800 font-medium">
//                         {formatDate(userData?.subscription?.startDate)} - {formatDate(userData?.subscription?.expiryDate)}
//                       </p>
//                     </div>
                    
//                     <div className="mb-4">
//                       <p className="text-sm text-gray-500 mb-1">Remaining Days</p>
//                       <div className="flex items-center">
//                         <Clock size={16} className="text-primary-500 mr-1" />
//                         <span className="text-gray-800 font-medium">
//                           {getRemainingDays(userData?.subscription?.expiryDate)} days
//                         </span>
//                       </div>
//                     </div>
//                   </>
//                 )}
                
//                 <div>
//                   <p className="text-sm text-gray-500 mb-1">Plan Benefits</p>
//                   <ul className="space-y-2">
//                     <li className="flex items-center">
//                       <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mr-2">
//                         <span className="text-dark text-xs font-bold">✓</span>
//                       </div>
//                       <span className="text-gray-700">
//                         {userData?.tokens?.maxBalance || 20} max token capacity
//                       </span>
//                     </li>
//                     {userData?.subscription?.tier !== 'free' && (
//                       <li className="flex items-center">
//                         <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mr-2">
//                           <span className="text-dark text-xs font-bold">✓</span>
//                         </div>
//                         <span className="text-gray-700">
//                           {getTierTokenInfo(userData?.subscription?.tier).initialTokens} tokens upon subscription
//                         </span>
//                       </li>
//                     )}
//                     <li className="flex items-center">
//                       <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mr-2">
//                         <span className="text-dark text-xs font-bold">✓</span>
//                       </div>
//                       <span className="text-gray-700">
//                         Generate stories and illustrations
//                       </span>
//                     </li>
//                     {userData?.subscription?.tier === 'premium' && (
//                       <li className="flex items-center">
//                         <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mr-2">
//                           <span className="text-dark text-xs font-bold">✓</span>
//                         </div>
//                         <span className="text-gray-700">Commercial usage rights</span>
//                       </li>
//                     )}
//                     {userData?.subscription?.tier !== 'free' && (
//                       <li className="flex items-center">
//                         <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mr-2">
//                           <span className="text-dark text-xs font-bold">✓</span>
//                         </div>
//                         <span className="text-gray-700">Premium story features</span>
//                       </li>
//                     )}
//                   </ul>
//                 </div>
                
//                 {userData?.subscription?.tier === 'free' && (
//                   <div className="mt-6 space-y-2">
//                     <button 
//                       onClick={() => handleSubscriptionUpgrade('basic')}
//                       className="w-full bg-primary-50 border border-primary-100 text-primary-600 text-sm font-medium py-2 px-3 rounded-lg hover:bg-primary-100 transition-colors flex justify-between items-center"
//                     >
//                       <span>Upgrade to Basic</span>
//                       <span>{getTierTokenInfo('basic').price}</span>
//                     </button>
//                     <button 
//                       onClick={() => handleSubscriptionUpgrade('premium')}
//                       className="w-full bg-primary-500 text-white text-sm font-medium py-2 px-3 rounded-lg hover:bg-primary-600 transition-colors flex justify-between items-center"
//                    >
//                      <span>Upgrade to Premium</span>
//                      <span>{getTierTokenInfo('premium').price}</span>
//                    </button>
//                  </div>
//                )}
               
//                {userData?.subscription?.tier === 'basic' && (
//                  <div className="mt-6">
//                    <button 
//                      onClick={() => handleSubscriptionUpgrade('premium')}
//                      className="w-full bg-accent text-dark text-sm font-medium py-2 px-3 rounded-lg hover:bg-accent/90 transition-colors flex justify-between items-center"
//                    >
//                      <span>Upgrade to Premium</span>
//                      <span>{getTierTokenInfo('premium').price}</span>
//                    </button>
                   
//                    <div className="mt-4 bg-primary-50 rounded-lg p-3">
//                      <p className="text-xs text-primary-600">
//                        Need more tokens? You can renew your Basic subscription early to get 40 more tokens immediately!
//                      </p>
//                      <button 
//                        onClick={() => handleSubscriptionUpgrade('basic')}
//                        className="mt-2 w-full bg-white border border-primary-200 text-primary-600 text-xs font-medium py-1.5 rounded hover:bg-primary-50 transition-colors"
//                      >
//                        Renew Basic Subscription Early
//                      </button>
//                    </div>
//                  </div>
//                )}
               
//                {userData?.subscription?.tier === 'premium' && (
//                  <div className="mt-6 bg-primary-50 rounded-lg p-3">
//                    <p className="text-xs text-primary-600">
//                      Need more tokens? You can renew your Premium subscription early to get 80 more tokens immediately!
//                    </p>
//                    <button 
//                      onClick={() => handleSubscriptionUpgrade('premium')}
//                      className="mt-2 w-full bg-white border border-primary-200 text-primary-600 text-xs font-medium py-1.5 rounded hover:bg-primary-50 transition-colors"
//                    >
//                      Renew Premium Subscription Early
//                    </button>
//                  </div>
//                )}
//              </div>
//            </div>
           
//            {/* Token system explainer */}
//            {/* <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//              <div className="p-6">
//                <h3 className="text-lg font-bold text-dark mb-4">How Tokens Work</h3>
//                <ul className="space-y-3">
//                  <li className="flex items-start">
//                    <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
//                      <Zap size={12} className="text-primary-500" />
//                    </div>
//                    <p className="text-sm text-gray-700">
//                      Creating a story costs <strong>5 tokens</strong>
//                    </p>
//                  </li>
//                  <li className="flex items-start">
//                    <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
//                      <Zap size={12} className="text-primary-500" />
//                    </div>
//                    <p className="text-sm text-gray-700">
//                      Saving a story costs <strong>2 additional tokens</strong>
//                    </p>
//                  </li>
//                  <li className="flex items-start">
//                    <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
//                      <Zap size={12} className="text-primary-500" />
//                    </div>
//                    <p className="text-sm text-gray-700">
//                      Different subscription tiers offer different token capacities:
//                      <br />
//                      <span className="text-xs text-gray-500 mt-1 block">
//                        • Free: 10 initial tokens, 20 max
//                        <br />
//                        • Basic: 40 tokens upon subscription, 50 max
//                        <br />
//                        • Premium: 80 tokens upon subscription, 100 max
//                      </span>
//                    </p>
//                  </li>
//                  <li className="flex items-start">
//                    <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
//                      <Zap size={12} className="text-primary-500" />
//                    </div>
//                    <p className="text-sm text-gray-700">
//                      Need more tokens? Upgrade your subscription or renew early to get more tokens immediately.
//                    </p>
//                  </li>
//                </ul>
//              </div>
//            </div> */}
//            {/* Token system explainer */}
//             <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//               <div className="p-6">
//                 <h3 className="text-lg font-bold text-dark mb-4">How Tokens Work</h3>
//                 <ul className="space-y-3">
//                   <li className="flex items-start">
//                     <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
//                       <Zap size={12} className="text-primary-500" />
//                     </div>
//                     <p className="text-sm text-gray-700">
//                       Creating a story costs <strong>5 tokens</strong>
//                     </p>
//                   </li>
//                   <li className="flex items-start">
//                     <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
//                       <Zap size={12} className="text-primary-500" />
//                     </div>
//                     <p className="text-sm text-gray-700">
//                       Saving a story costs <strong>2 additional tokens</strong>
//                     </p>
//                   </li>
//                   <li className="flex items-start">
//                     <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
//                       <Zap size={12} className="text-primary-500" />
//                     </div>
//                     <p className="text-sm text-gray-700">
//                       Different subscription tiers offer different token benefits:
//                       <br />
//                       <span className="text-xs text-gray-500 mt-1 block">
//                         • Free: 10 initial tokens, 20 max
//                         <br />
//                         • Basic: 40 tokens upon subscription, 50 max
//                         <br />
//                         • Premium: 80 tokens upon subscription, 100 max
//                       </span>
//                     </p>
//                   </li>
//                   <li className="flex items-start">
//                     <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
//                       <Zap size={12} className="text-primary-500" />
//                     </div>
//                     <p className="text-sm text-gray-700">
//                       When upgrading to Premium, you'll always receive the full 80 tokens, regardless of your current balance.
//                     </p>
//                   </li>
//                   <li className="flex items-start">
//                     <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
//                       <Zap size={12} className="text-primary-500" />
//                     </div>
//                     <p className="text-sm text-gray-700">
//                       Need more tokens? Upgrade your subscription or renew early to get more tokens immediately.
//                     </p>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//          </div>
//        </div>
//      </div>
//    </div>
//  );
// };

// export default Profile;

import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { User, Edit, Save, X, Upload, Clock, Zap, Book, CreditCard, ShoppingCart } from 'lucide-react';
import { login, updateUserData } from '../store/authSlice.js'; // Adjust path as needed
import useRazorpayCheckout from './useRazorpayCheckout.js';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector(state => state.auth.userData);
  const authToken = useSelector(state => state.auth.token);
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: ''
  });
  const [storyHistory, setStoryHistory] = useState([]);
  const [loadingStories, setLoadingStories] = useState(false);
  const [activeTab, setActiveTab] = useState('account');
  const { isLoading: razorpayLoading, handlePayment } = useRazorpayCheckout();
  const [showFullTokenHistory, setShowFullTokenHistory] = useState(false);

    const refreshUserData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/users/me`,
        { 
          withCredentials: true
        }
      );
      
      if (response.data.success) {
        // Update Redux store with fresh user data
        dispatch(login(response.data.data));
        console.log("User data refreshed successfully");
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  };

  // Call the function when the component mounts
  useEffect(() => {
    refreshUserData();
  }, []);

  // Check for tab in URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location]);


// Get tier information
  const getTierTokenInfo = (tier) => {
    switch(tier) {
      case 'basic':
        return {
          initialTokens: 40,
          maxTokens: 50,
          price: 299,
          display: '₹299/month'
        };
      case 'premium':
        return {
          initialTokens: 80,
          maxTokens: 100,
          price: 599,
          display: '₹599/month'
        };
      case 'free':
      default:
        return {
          initialTokens: 10,
          maxTokens: 20,
          price: 0,
          display: 'Free'
        };
    }
  };

  // const handleSubscriptionAction = useCallback(async (tier, isRenewal = false) => {
  //   setPaymentLoading(true);
    
  //   try {
  //     const tierInfo = getTierTokenInfo(tier);
      
  //     // Create order details
  //     const orderDetails = {
  //       orderType: 'subscription_upgrade',
  //       itemDetails: {
  //         tier,
  //         amount: tierInfo.price,
  //         isRenewal
  //       },
  //       description: `${tier.charAt(0).toUpperCase() + tier.slice(1)} Plan ${isRenewal ? 'Renewal' : 'Subscription'}`,
  //       prefill: {
  //         email: userData?.email || '',
  //         name: userData?.fullname || ''
  //       }
  //     };
      
  //     // Use the custom hook to handle payment
  //     handlePayment(
  //       orderDetails,
  //       // Success callback
  //       (result) => {
  //         // Update user data in Redux if needed
  //         if (result.user) {
  //           dispatch(updateUserData(result.user));
  //         }
          
  //         toast.success(`Your ${tier} subscription has been ${isRenewal ? 'renewed' : 'activated'} successfully!`);
          
  //         // Navigate to success page with details
  //         navigate(`/payment/success?type=subscription&tier=${tier}&isRenewal=${isRenewal}`);
          
  //         setPaymentLoading(false);
  //       },
  //       // Failure callback
  //       (error) => {
  //         console.error('Subscription payment failed:', error);
  //         toast.error(error.response?.data?.message || 'Subscription payment failed. Please try again.');
  //         setPaymentLoading(false);
  //       }
  //     );
  //   } catch (error) {
  //     console.error('Subscription error:', error);
  //     toast.error('Something went wrong with the subscription process. Please try again.');
  //     setPaymentLoading(false);
  //   }
  // }, [dispatch, navigate, userData, handlePayment, getTierTokenInfo]);


  // Format date to readable string
  
  const handleSubscriptionAction = useCallback(async (tier, isRenewal = false) => {
    setPaymentLoading(true);
    
    try {
      const tierInfo = getTierTokenInfo(tier);
      
      // DEBUG: Log subscription action details
      console.log('🔔 Starting subscription action:', {
        tier,
        isRenewal,
        amount: tierInfo.price,
        userData: {
          id: userData?._id,
          email: userData?.email,
          subscription: userData?.subscription
        }
      });
      
      // Prepare order details for the hook
      const orderDetails = {
        orderType: 'subscription_upgrade',
        itemDetails: {
          tier,
          amount: tierInfo.price,
          isRenewal
        },
        description: `${tier.charAt(0).toUpperCase() + tier.slice(1)} Plan ${isRenewal ? 'Renewal' : 'Subscription'}`,
        prefill: {
          email: userData?.email || '',
          name: userData?.fullname || ''
        }
      };
      
      // DEBUG: Log the full order details
      console.log('📦 Subscription order details:', orderDetails);
      
      // Use the Razorpay hook to handle payment
      handlePayment(
        orderDetails,
        // Success callback
        (result) => {
          // DEBUG: Log success result
          console.log('✅ Subscription action success:', result);
          
          toast.success(`Your ${tier} subscription has been ${isRenewal ? 'renewed' : 'activated'} successfully!`);
          // Note: User data update is handled in the hook via Redux
          
          // Navigate to success page with details
          navigate('/profile');
          setPaymentLoading(false);
        },
        // Failure callback
        (error) => {
          // DEBUG: Log detailed error
          console.error('❌ Subscription payment failed:', error);
          console.error('Error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
          });
          
          toast.error(error.response?.data?.message || 'Subscription payment failed. Please try again.');
          setPaymentLoading(false);
        }
      );
    } catch (error) {
      // DEBUG: Log error
      console.error('❌ Subscription action error:', error);
      console.error('Error stack:', error.stack);
      
      toast.error('Something went wrong with the subscription process. Please try again.');
      setPaymentLoading(false);
    }
  }, [navigate, userData, handlePayment, getTierTokenInfo]);
  
  
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
      case 'basic': return 'Basic';
      case 'premium': return 'Premium';
      default: return tier.charAt(0).toUpperCase() + tier.slice(1);
    }
  };

  // Get proper badge color based on subscription tier
  const getTierBadgeColor = (tier) => {
    switch(tier) {
      case 'free': return 'bg-gray-200 text-gray-800';
      case 'basic': return 'bg-primary-500 text-white';
      case 'premium': return 'bg-accent text-dark';
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

  // Fetch user stories
  const fetchUserStories = async () => {
    setLoadingStories(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories/get-all-stories`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      setStoryHistory(response.data.data);
    } catch (error) {
      console.error('Error fetching stories:', error);
      toast.error('Failed to load story history');
    } finally {
      setLoadingStories(false);
    }
  };

  // Initialize component with user data
  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.username || '',
        fullname: userData.fullname || '',
        email: userData.email || '',
      });
      
      setAvatarPreview(userData.avatar || '');
      
      // Fetch user's stories
      fetchUserStories();
    }
  }, [userData, authToken]);

  // Handle form input changes
  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value
  //   });
  // };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Skip updating email in the form data
    if (name !== 'email') {
      setFormData({
        ...formData,
        [name]: value
      });
    }
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
          fullname: formData.fullname
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
      dispatch(updateUserData(profileResponse.data.data));
      
      toast.success('Profile updated successfully!');
      setEditMode(false);
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  // Calculate potential story count from token balance
  const getMaxStoryCount = (tokenBalance) => {
    // Each story costs 7 tokens total (5 to generate + 2 to save)
    return Math.floor(tokenBalance / 7);
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
                        <h2 className="text-2xl font-bold text-dark">{userData?.fullname || 'User'}</h2>
                        <p className="text-gray-500">@{userData?.username || 'username'}</p>
                        <div className="mt-1">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getTierBadgeColor(userData?.subscription?.tier || 'free')}`}>
                            {getSubscriptionTierName(userData?.subscription?.tier)} Plan
                          </span>
                        </div>
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
                          <label className="block text-sm font-medium text-gray-700 mb-1">{editMode ? "Email (Can not be chnaged)" : "Email"}</label>
                          <p className="text-gray-800">{formData.email}</p>
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
                        <div>
                          <p className="text-sm text-gray-500">Email Verified</p>
                          <div className="flex items-center gap-2">
                            <p className="text-gray-800">
                              {userData?.isEmailVerified ? 
                                <span className="text-green-600">Yes</span> : 
                                <span className="text-red-600">No</span>
                              }
                            </p>
                            {!userData?.isEmailVerified && (
                              <button
                                onClick={async () => {
                                  try {
                                    await axios.post(
                                      `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/users/send-verification-email`,
                                      {},
                                      {
                                        withCredentials: true,
                                        headers: {
                                          'Content-Type': 'application/json'
                                        }
                                      }
                                    );
                                    toast.success('Verification email sent! Please check your inbox.');
                                  } catch (error) {
                                    console.error('Error sending verification email:', error);
                                    toast.error(error.response?.data?.message || 'Failed to send verification email');
                                  }
                                }}
                                className="text-xs bg-primary-500 text-white px-2 py-1 rounded hover:bg-primary-600 transition-colors"
                              >
                                Verify Now
                              </button>
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total Stories Created</p>
                          <p className="text-gray-800">{storyHistory.metadata?.totalStories || 0}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Story History */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-8">
              <div className="bg-gradient-primary p-6">
                <h3 className="text-xl font-chewy text-white mb-0">My Story History</h3>
                <p className="text-white text-sm">
                  Total Stories: {storyHistory.metadata?.totalStories || 0}
                </p>
              </div>
              
              <div className="p-6">
                {loadingStories ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                    <p className="mt-2 text-gray-600">Loading stories...</p>
                  </div>
                ) : storyHistory.stories && storyHistory.stories.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Title</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Type</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Created</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Status</th>
                          <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {storyHistory.stories.map((story) => (
                          <tr key={story._id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 text-gray-800">{story.title}</td>
                            <td className="py-3 px-4 text-gray-600 capitalize">{story.storyType}</td>
                            <td className="py-3 px-4 text-gray-600">{formatDate(story.createdAt)}</td>
                            <td className="py-3 px-4">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${
                                story.status === 'published' ? 'bg-green-100 text-green-800' :
                                story.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {story.status.charAt(0).toUpperCase() + story.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                            <button 
                                onClick={() => navigate(`/edit-story/${story._id}`)}
                                className="text-primary-500 hover:text-primary-600 text-sm font-medium"
                              >
                                View/Edit
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Optional: Story Type Breakdown */}
                    {storyHistory.metadata?.storyTypeCounts && (
                      <div className="mt-6 border-t pt-4">
                        <h4 className="text-md font-semibold text-gray-700 mb-3">Story Type Breakdown</h4>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(storyHistory.metadata.storyTypeCounts).map(([type, count]) => (
                            <div 
                              key={type} 
                              className="bg-primary-50 px-3 py-2 rounded-full flex items-center"
                            >
                              <span className="text-primary-700 capitalize mr-2">{type}:</span>
                              <span className="font-bold">{count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <Book size={40} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">You haven't created any stories yet</p>
                    <button 
                      onClick={() => navigate('/story-generator')}
                      className="mt-4 inline-block bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      Create Your First Story
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right column: Subscription and tokens */}
          <div className="space-y-6">
            {/* Token information */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-primary p-6">
                <h3 className="text-xl font-chewy text-white mb-2">My Tokens</h3>
                <div className="flex items-center text-white">
                  <Zap size={20} className="mr-2" />
                  <span className="text-2xl font-bold">{userData?.tokens?.balance || 0}</span>
                  <span className="text-sm ml-2 opacity-80">/ {userData?.tokens?.maxBalance || 20} max</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Token Balance</span>
                    <span className="text-sm font-medium text-gray-700">
                      {userData?.tokens?.balance || 0} / {userData?.tokens?.maxBalance || 20}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full" 
                      style={{ width: `${Math.min(((userData?.tokens?.balance || 0) / (userData?.tokens?.maxBalance || 20)) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-3 bg-primary-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <Zap size={18} className="text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-primary-600 font-medium">
                        You can create approximately {getMaxStoryCount(userData?.tokens?.balance || 0)} stories with your current tokens
                      </p>
                      <p className="text-xs text-primary-500 mt-1">
                        (5 tokens to generate + 2 tokens to save)
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Updated: Token Purchase Button
                <div className="mt-6">
                  <h4 className="text-md font-medium text-gray-800 mb-3">Need More Tokens?</h4>
                  <button 
                    onClick={() => navigate('/tokens')}
                    className="w-full bg-primary-500 text-white py-2 px-3 rounded-lg hover:bg-primary-600 transition-colors flex justify-center items-center"
                    disabled={paymentLoading}
                  >
                    <ShoppingCart size={16} className="mr-2" />
                    {paymentLoading ? 'Processing...' : 'Purchase Tokens'}
                  </button>
                </div> */}
                
                <div className="mt-6">
                  <h4 className="text-md font-medium text-gray-800 mb-3">Token Usage History</h4>
                  {userData?.tokenHistory && userData.tokenHistory.length > 0 ? (
                    <div className="max-h-48 overflow-y-auto">
                      {(showFullTokenHistory ? userData.tokenHistory : userData.tokenHistory.slice(0, 5)).map((entry, index) => (
                        <div key={index} className="py-2 border-b last:border-b-0 flex justify-between">
                          <div>
                            <p className="text-sm text-gray-800">{entry.description}</p>
                            <p className="text-xs text-gray-500">{formatDate(entry.date)}</p>
                          </div>
                          <div className={`text-sm font-medium ${entry.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {entry.amount > 0 ? `+${entry.amount}` : entry.amount}
                          </div>
                        </div>
                      ))}
                      
                      {!showFullTokenHistory && userData.tokenHistory.length > 5 && (
                        <div className="text-center mt-2">
                          <button 
                            onClick={() => setShowFullTokenHistory(true)} 
                            className="text-primary-500 text-sm hover:underline"
                          >
                            View All History
                          </button>
                        </div>
                      )}
                      
                      {showFullTokenHistory && (
                        <div className="text-center mt-2">
                          <button 
                            onClick={() => setShowFullTokenHistory(false)} 
                            className="text-primary-500 text-sm hover:underline"
                          >
                            Show Less
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No token usage history yet</p>
                  )}
                </div>
              </div>
            </div>
            
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
                    {/* Updated with Razorpay integration */}
                    <button 
                      onClick={() => navigate('/pricing')}
                      className="bg-accent text-dark font-bold px-4 py-2 rounded-full text-sm hover:bg-accent/90 transition-colors"
                      disabled={paymentLoading}
                    >
                      {paymentLoading ? 'Processing...' : userData?.subscription?.tier === 'free' ? 'Upgrade' : 'Manage'}
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
                  <p className="text-sm text-gray-500 mb-1">Plan Benefits</p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mr-2">
                        <span className="text-dark text-xs font-bold">✓</span>
                      </div>
                      <span className="text-gray-700">
                        {userData?.tokens?.maxBalance || 20} max token capacity
                      </span>
                    </li>
                    {userData?.subscription?.tier !== 'free' && (
                      <li className="flex items-center">
                        <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mr-2">
                        <span className="text-dark text-xs font-bold">✓</span>
                      </div>
                      <span className="text-gray-700">
                        {getTierTokenInfo(userData?.subscription?.tier).initialTokens} tokens upon subscription
                      </span>
                    </li>
                  )}
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mr-2">
                      <span className="text-dark text-xs font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">
                      Generate stories and illustrations
                    </span>
                  </li>
                  {userData?.subscription?.tier === 'premium' && (
                    <li className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mr-2">
                        <span className="text-dark text-xs font-bold">✓</span>
                      </div>
                      <span className="text-gray-700">Commercial usage rights</span>
                    </li>
                  )}
                  {userData?.subscription?.tier !== 'free' && (
                    <li className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mr-2">
                        <span className="text-dark text-xs font-bold">✓</span>
                      </div>
                      <span className="text-gray-700">Premium story features</span>
                    </li>
                  )}
                </ul>
              </div>
              
              {userData?.subscription?.tier === 'free' && (
                <div className="mt-6 space-y-2">
                  <button 
                    onClick={() => navigate('/subscription-payment?plan=basic')}
                    className="w-full bg-primary-50 border border-primary-100 text-primary-600 text-sm font-medium py-2 px-3 rounded-lg hover:bg-primary-100 transition-colors flex justify-between items-center"
                  >
                    <span>Upgrade to Basic</span>
                    <span>{getTierTokenInfo('basic').display}</span>
                  </button>
                  <button 
                    onClick={() => navigate('/subscription-payment?plan=premium')}
                    className="w-full bg-primary-500 text-white text-sm font-medium py-2 px-3 rounded-lg hover:bg-primary-600 transition-colors flex justify-between items-center"
                  >
                    <span>Upgrade to Premium</span>
                    <span>{getTierTokenInfo('premium').display}</span>
                  </button>
                </div>
              )}
              
              {userData?.subscription?.tier === 'basic' && (
                <div className="mt-6">
                  <button 
                    onClick={() => navigate('/subscription-payment?plan=premium')}
                    className="w-full bg-accent text-dark text-sm font-medium py-2 px-3 rounded-lg hover:bg-accent/90 transition-colors flex justify-between items-center"
                  >
                    <span>Upgrade to Premium</span>
                    <span>{getTierTokenInfo('premium').display}</span>
                  </button>
                  
                  <div className="mt-4 bg-primary-50 rounded-lg p-3">
                    <p className="text-xs text-primary-600">
                      Need more tokens? You can renew your Basic subscription early to get 40 more tokens immediately!
                    </p>
                    <button 
                      onClick={() => navigate('/subscription-payment?plan=basic&renew=true')}
                      className="mt-2 w-full bg-white border border-primary-200 text-primary-600 text-xs font-medium py-1.5 rounded hover:bg-primary-50 transition-colors"
                      disabled={paymentLoading}
                    >
                      {paymentLoading ? 'Processing...' : 'Renew Basic Subscription Early'}
                    </button>
                  </div>
                </div>
              )}
              
              {userData?.subscription?.tier === 'premium' && (
                <div className="mt-6 bg-primary-50 rounded-lg p-3">
                  <p className="text-xs text-primary-600">
                    Need more tokens? You can renew your Premium subscription early to get 80 more tokens immediately!
                  </p>
                  <button 
                    onClick={() => handleSubscriptionAction('premium', true)}
                    className="mt-2 w-full bg-white border border-primary-200 text-primary-600 text-xs font-medium py-1.5 rounded hover:bg-primary-50 transition-colors"
                    disabled={paymentLoading}
                  >
                    {paymentLoading ? 'Processing...' : 'Renew Premium Subscription Early'}
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Token system explainer */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-bold text-dark mb-4">How Tokens Work</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                    <Zap size={12} className="text-primary-500" />
                  </div>
                  <p className="text-sm text-gray-700">
                    Creating a story costs <strong>5 tokens</strong>
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                    <Zap size={12} className="text-primary-500" />
                  </div>
                  <p className="text-sm text-gray-700">
                    Saving a story costs <strong>2 additional tokens</strong>
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                    <Zap size={12} className="text-primary-500" />
                  </div>
                  <p className="text-sm text-gray-700">
                    Different subscription tiers offer different token benefits:
                    <br />
                    <span className="text-xs text-gray-500 mt-1 block">
                      • Free: 10 initial tokens, 20 max
                      <br />
                      • Basic: 40 tokens upon subscription, 50 max
                      <br />
                      • Premium: 80 tokens upon subscription, 100 max
                    </span>
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                    <Zap size={12} className="text-primary-500" />
                  </div>
                  <p className="text-sm text-gray-700">
                    When upgrading to Premium, you'll always receive the full 80 tokens, regardless of your current balance.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                    <Zap size={12} className="text-primary-500" />
                  </div>
                  <p className="text-sm text-gray-700">
                    Need more tokens? Upgrade your subscription or renew early to get more tokens immediately.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default Profile;