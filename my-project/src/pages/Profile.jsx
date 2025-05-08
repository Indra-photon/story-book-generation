
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { User, Edit, Save, X, Upload, Clock, Zap, Book, CreditCard } from 'lucide-react';

// const Profile = () => {
//   const dispatch = useDispatch();
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
//       case 'pro': return 'Pro';
//       case 'business': return 'Business';
//       default: return tier.charAt(0).toUpperCase() + tier.slice(1);
//     }
//   };

//   // Get proper badge color based on subscription tier
//   const getTierBadgeColor = (tier) => {
//     switch(tier) {
//       case 'free': return 'bg-gray-200 text-gray-800';
//       case 'pro': return 'bg-primary-500 text-white';
//       case 'business': return 'bg-accent text-dark';
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

//   // Fetch user stories
//   const fetchUserStories = async () => {
//     setLoadingStories(true);
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories`,
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`
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

//   // Purchase additional tokens
//   const handlePurchaseTokens = async (amount) => {
//     setLoading(true);
//     try {
//       // This is a placeholder - you'll need to implement actual payment processing
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/users/purchase-tokens`,
//         { tokenAmount: amount },
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`
//           }
//         }
//       );
      
//       toast.success(`Successfully purchased ${amount} tokens!`);
//       // Refresh user data to show updated token balance
//       // dispatch(fetchUserData()); // You'll need to implement this action
//     } catch (error) {
//       console.error('Token purchase error:', error);
//       toast.error(error.response?.data?.message || 'Failed to purchase tokens');
//     } finally {
//       setLoading(false);
//     }
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
//                           <p className="text-gray-800">
//                             {userData?.isEmailVerified ? 
//                               <span className="text-green-600">Yes</span> : 
//                               <span className="text-red-600">No</span>
//                             }
//                           </p>
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
//               </div>
              
//               <div className="p-6">
//                 {loadingStories ? (
//                   <div className="text-center py-8">
//                     <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
//                     <p className="mt-2 text-gray-600">Loading stories...</p>
//                   </div>
//                 ) : storyHistory.length > 0 ? (
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
//                         {storyHistory.map((story) => (
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
//                               <a 
//                                 href={`/stories/${story._id}`}
//                                 className="text-primary-500 hover:text-primary-600 text-sm font-medium"
//                               >
//                                 View
//                               </a>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 ) : (
//                   <div className="text-center py-10">
//                     <Book size={40} className="mx-auto text-gray-300 mb-3" />
//                     <p className="text-gray-500">You haven't created any stories yet</p>
//                     <a href="/stories/new" className="mt-4 inline-block bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
//                       Create Your First Story
//                     </a>
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
//                   <span className="text-sm ml-2 opacity-80">/ {userData?.tokens?.maxBalance || 50} max</span>
//                 </div>
//               </div>
              
//               <div className="p-6">
//                 <div className="mb-4">
//                   <div className="flex justify-between mb-2">
//                     <span className="text-sm font-medium text-gray-700">Token Balance</span>
//                     <span className="text-sm font-medium text-gray-700">
//                       {userData?.tokens?.balance || 0} / {userData?.tokens?.maxBalance || 50}
//                     </span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div 
//                       className="bg-primary-500 h-2 rounded-full" 
//                       style={{ width: `${Math.min(((userData?.tokens?.balance || 0) / (userData?.tokens?.maxBalance || 50)) * 100, 100)}%` }}
//                     ></div>
//                   </div>
//                 </div>
                
//                 <div className="mt-6">
//                   <h4 className="text-md font-medium text-gray-800 mb-3">Purchase More Tokens</h4>
//                   <div className="grid grid-cols-3 gap-2">
//                     <button 
//                       onClick={() => handlePurchaseTokens(10)}
//                       className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
//                       disabled={loading}
//                     >
//                       +10 Tokens
//                     </button>
//                     <button 
//                       onClick={() => handlePurchaseTokens(50)}
//                       className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
//                       disabled={loading}
//                     >
//                       +50 Tokens
//                     </button>
//                     <button 
//                       onClick={() => handlePurchaseTokens(100)}
//                       className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
//                       disabled={loading}
//                     >
//                       +100 Tokens
//                     </button>
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
//                     <button className="bg-accent text-dark font-bold px-4 py-2 rounded-full text-sm hover:bg-accent/90 transition-colors">
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
//                         {userData?.tokens?.maxBalance || 50} max token capacity
//                       </span>
//                     </li>
//                     <li className="flex items-center">
//                       <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mr-2">
//                         <span className="text-dark text-xs font-bold">✓</span>
//                       </div>
//                       <span className="text-gray-700">
//                         Generate stories and illustrations
//                       </span>
//                     </li>
//                     {userData?.subscription?.tier !== 'free' && (
//                       <>
//                         <li className="flex items-center">
//                           <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mr-2">
//                             <span className="text-dark text-xs font-bold">✓</span>
//                           </div>
//                           <span className="text-gray-700">Monthly token refills</span>
//                         </li>
//                         <li className="flex items-center">
//                           <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mr-2">
//                             <span className="text-dark text-xs font-bold">✓</span>
//                           </div>
//                           <span className="text-gray-700">Premium story features</span>
//                         </li>
//                       </>
//                     )}
//                   </ul>
//                 </div>
                
//                 {userData?.subscription?.tier === 'free' && (
//                   <div className="mt-6 p-4 bg-primary-50 rounded-lg">
//                     <h4 className="font-medium text-primary-700 flex items-center">
//                       <CreditCard size={16} className="mr-2" />
//                       Upgrade to Pro
//                     </h4>
//                     <p className="text-sm text-primary-600 mt-1 mb-3">
//                       Get 200 max tokens, monthly refills, and premium features!
//                     </p>
//                     <button className="w-full bg-primary-500 text-white text-sm font-medium py-2 rounded-lg hover:bg-primary-600 transition-colors">
//                       View Pro Plan Options
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// Profile.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { User, Edit, Save, X, Upload, Clock, Zap, Book, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.userData);
  const authToken = useSelector(state => state.auth.token); // Get auth token from Redux store
  const [loading, setLoading] = useState(false);
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

  // Fetch user stories
  const fetchUserStories = async () => {
    setLoadingStories(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/stories/get-all-stories`,
        {
          withCredentials : true,
          headers: {
              "Content-Type": "application/json"
          }
        }
      );
      console.log(response.data.data)
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

  // Purchase additional tokens
  const handlePurchaseTokens = async (amount) => {
    setLoading(true);
    try {
      // This is a placeholder - you'll need to implement actual payment processing
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_DOMAIN}/api/v1/users/purchase-tokens`,
        { tokenAmount: amount },
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      );
      
      toast.success(`Successfully purchased ${amount} tokens!`);
      // Refresh user data to show updated token balance
      // dispatch(fetchUserData()); // You'll need to implement this action
    } catch (error) {
      console.error('Token purchase error:', error);
      toast.error(error.response?.data?.message || 'Failed to purchase tokens');
    } finally {
      setLoading(false);
    }
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
                          <p className="text-gray-800">{userData?.storiesCreated || 0}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Story History */}
            {/* <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-8">
              <div className="bg-gradient-primary p-6">
                <h3 className="text-xl font-chewy text-white mb-0">My Story History</h3>
              </div>
              
              <div className="p-6">
                {loadingStories ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                    <p className="mt-2 text-gray-600">Loading stories...</p>
                  </div>
                ) : storyHistory.stories.length > 0 ? (
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
                        {storyHistory.map((story) => (
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
                              <a 
                                href={`/stories/${story._id}`}
                                className="text-primary-500 hover:text-primary-600 text-sm font-medium"
                              >
                                View
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <Book size={40} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">You haven't created any stories yet</p>
                    <a href="/stories/new" className="mt-4 inline-block bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors">
                      Create Your First Story
                    </a>
                  </div>
                )}
              </div>
            </div> */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-8">
              <div className="bg-gradient-primary p-6">
                <h3 className="text-xl font-chewy text-white mb-0">My Story History</h3>
                {/* Optional: Add story count */}
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
                    <div className="mt-6 border-t pt-4">
                      <h4 className="text-md font-semibold text-gray-700 mb-3">Story Type Breakdown</h4>
                      <div className="flex space-x-4">
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
                  <span className="text-sm ml-2 opacity-80">/ {userData?.tokens?.maxBalance || 50} max</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Token Balance</span>
                    <span className="text-sm font-medium text-gray-700">
                      {userData?.tokens?.balance || 0} / {userData?.tokens?.maxBalance || 50}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full" 
                      style={{ width: `${Math.min(((userData?.tokens?.balance || 0) / (userData?.tokens?.maxBalance || 50)) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-md font-medium text-gray-800 mb-3">Purchase More Tokens</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => handlePurchaseTokens(10)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                      disabled={loading}
                    >
                      +10 Tokens
                    </button>
                    <button 
                      onClick={() => handlePurchaseTokens(50)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                      disabled={loading}
                    >
                      +50 Tokens
                    </button>
                    <button 
                      onClick={() => handlePurchaseTokens(100)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                      disabled={loading}
                    >
                      +100 Tokens
                    </button>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-md font-medium text-gray-800 mb-3">Token Usage History</h4>
                  {userData?.tokenHistory && userData.tokenHistory.length > 0 ? (
                    <div className="max-h-48 overflow-y-auto">
                      {userData.tokenHistory.slice(0, 5).map((entry, index) => (
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
                      {userData.tokenHistory.length > 5 && (
                        <div className="text-center mt-2">
                          <button className="text-primary-500 text-sm hover:underline">
                            View All History
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
                  <p className="text-sm text-gray-500 mb-1">Plan Benefits</p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mr-2">
                        <span className="text-dark text-xs font-bold">✓</span>
                      </div>
                      <span className="text-gray-700">
                        {userData?.tokens?.maxBalance || 50} max token capacity
                      </span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mr-2">
                        <span className="text-dark text-xs font-bold">✓</span>
                      </div>
                      <span className="text-gray-700">
                        Generate stories and illustrations
                      </span>
                    </li>
                    {userData?.subscription?.tier !== 'free' && (
                      <>
                        <li className="flex items-center">
                          <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mr-2">
                            <span className="text-dark text-xs font-bold">✓</span>
                          </div>
                          <span className="text-gray-700">Monthly token refills</span>
                        </li>
                        <li className="flex items-center">
                          <div className="w-5 h-5 rounded-full bg-accent2 flex items-center justify-center flex-shrink-0 mr-2">
                            <span className="text-dark text-xs font-bold">✓</span>
                          </div>
                          <span className="text-gray-700">Premium story features</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                
                {userData?.subscription?.tier === 'free' && (
                  <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                    <h4 className="font-medium text-primary-700 flex items-center">
                      <CreditCard size={16} className="mr-2" />
                      Upgrade to Pro
                    </h4>
                    <p className="text-sm text-primary-600 mt-1 mb-3">
                      Get 200 max tokens, monthly refills, and premium features!
                    </p>
                    <button className="w-full bg-primary-500 text-white text-sm font-medium py-2 rounded-lg hover:bg-primary-600 transition-colors">
                      View Pro Plan Options
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;