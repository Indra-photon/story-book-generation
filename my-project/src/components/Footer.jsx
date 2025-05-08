// // Footer.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Footer = () => {
//   return (
//     <footer className="bg-dark text-white">
//       <div className="container mx-auto px-4">
//         {/* CTA section */}
//         <div className="py-16 text-center">
//           <h2 className="text-3xl md:text-4xl font-chewy mb-4">Ready to Bring Your Portrait to Life?</h2>
//           <p className="text-white/80 max-w-xl mx-auto mb-8">
//             Join thousands of creators who have transformed their online presence with animated characters
//           </p>
//           <div className="flex flex-wrap justify-center gap-4">
//             <button className="px-8 py-4 bg-accent text-dark font-bold rounded-full hover:-translate-y-1 transform transition duration-200">
//               Get Started Free
//             </button>
//             <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition duration-200">
//               View Pricing
//             </button>
//           </div>
//         </div>
        
//         {/* Main footer content */}
//         <div className="py-12 border-t border-white/20">
//           <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
//             {/* Brand column */}
//             <div className="md:col-span-2">
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
//                   C
//                 </div>
//                 <span className="text-2xl font-chewy text-white">CharaFun</span>
//               </div>
//               <p className="text-white/70 mb-6">
//                 Transform your portrait photos into animated cartoon characters with our powerful AI technology.
//               </p>
//               <div className="flex gap-4">
//                 <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-500 transition-colors">
//                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
//                   </svg>
//                 </a>
//                 <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-500 transition-colors">
//                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
//                   </svg>
//                 </a>
//                 <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-500 transition-colors">
//                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
//                   </svg>
//                 </a>
//                 <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-500 transition-colors">
//                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
//                   </svg>
//                 </a>
//               </div>
//             </div>
            
//             {/* Links columns */}
//             <div>
//               <h3 className="text-white font-bold mb-4">Product</h3>
//               <ul className="space-y-2">
//                 <li><Link to="/features" className="text-white/70 hover:text-white transition-colors">Features</Link></li>
//                 <li><Link to="/pricing" className="text-white/70 hover:text-white transition-colors">Pricing</Link></li>
//                 <li><Link to="/gallery" className="text-white/70 hover:text-white transition-colors">Gallery</Link></li>
//                 <li><Link to="/resources" className="text-white/70 hover:text-white transition-colors">Resources</Link></li>
//               </ul>
//             </div>
            
//             <div>
//               <h3 className="text-white font-bold mb-4">Company</h3>
//               <ul className="space-y-2">
//                 <li><Link to="/about" className="text-white/70 hover:text-white transition-colors">About Us</Link></li>
//                 <li><Link to="/careers" className="text-white/70 hover:text-white transition-colors">Careers</Link></li>
//                 <li><Link to="/blog" className="text-white/70 hover:text-white transition-colors">Blog</Link></li>
//                 <li><Link to="/press" className="text-white/70 hover:text-white transition-colors">Press</Link></li>
//               </ul>
//             </div>
            
//             <div>
//               <h3 className="text-white font-bold mb-4">Legal</h3>
//               <ul className="space-y-2">
//                 <li><Link to="/terms" className="text-white/70 hover:text-white transition-colors">Terms of Service</Link></li>
//                 <li><Link to="/privacy" className="text-white/70 hover:text-white transition-colors">Privacy Policy</Link></li>
//                 <li><Link to="/cookies" className="text-white/70 hover:text-white transition-colors">Cookie Policy</Link></li>
//                 <li><Link to="/accessibility" className="text-white/70 hover:text-white transition-colors">Accessibility</Link></li>
//               </ul>
//             </div>
//           </div>
//         </div>
        
//         {/* Bottom footer */}
//         <div className="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
//           <p className="text-white/60 text-sm mb-4 md:mb-0">
//             © {new Date().getFullYear()} CharaFun. All rights reserved.
//           </p>
          
//           <div className="flex items-center gap-4">
//             <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Status</a>
//             <span className="text-white/40">•</span>
//             <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Help Center</a>
//             <span className="text-white/40">•</span>
//             <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Contact</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white">
      <div className="container mx-auto px-4">
        {/* CTA section */}
        <div className="py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-chewy mb-4">Ready to Create Magical Stories?</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Join thousands of parents who have created personalized storybooks featuring their children
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup" className="px-8 py-4 bg-accent text-dark font-bold rounded-full hover:-translate-y-1 transform transition duration-200">
              Start Creating For Free
            </Link>
          </div>
        </div>
        
        {/* Main footer content */}
        <div className="py-12 border-t border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Brand column */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
                  S
                </div>
                <span className="text-2xl font-chewy text-white">StoryTeller</span>
              </div>
              <p className="text-white/70 mb-6">
                Create personalized storybooks featuring your child as the main character with our magical AI technology.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-500 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-500 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-500 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-500 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M11.9975 2.02783C10.9309 2.02866 9.87239 2.19857 8.8633 2.52978C5.5273 3.47035 2.94079 5.87391 1.75256 9.06008C0.584587 12.2032 0.95411 15.7494 2.77492 18.5608C4.59574 21.3722 7.68368 23.1523 11.0695 23.4488C13.5656 23.6701 16.0526 23.0432 18.1248 21.688C20.197 20.3328 21.7321 18.337 22.4362 16.0283C23.1404 13.7195 22.9709 11.2528 21.9546 9.06203C20.9403 6.87306 19.1493 5.10821 16.9484 4.0842C15.3814 3.36447 13.6991 2.98815 11.9975 2.97748V2.02783ZM11.9975 22.4991C6.07267 22.4991 1.3728 17.6893 1.3728 11.652C1.37024 10.0585 1.68174 8.48061 2.28673 7.01332C2.89171 5.54604 3.77813 4.22034 4.88788 3.12279C6.86249 1.15272 9.61836 0 12.4885 0C15.3586 0 18.1144 1.15272 20.089 3.12279C22.0636 5.09286 23.2181 7.84223 23.2181 10.706C23.2181 13.5698 22.0636 16.3192 20.089 18.2892C18.1144 20.2593 15.3586 21.412 12.4885 21.412C12.3246 21.412 12.1608 21.4079 11.9975 21.3998V22.3494C12.1608 22.3576 12.3242 22.3617 12.4885 22.3617C15.6943 22.3617 18.7677 21.0661 20.9876 18.8525C23.2075 16.6388 24.5065 13.574 24.5065 10.3777C24.5065 7.18137 23.2075 4.11656 20.9876 1.9029C18.7677 -0.310761 15.6943 -1.60637 12.4885 -1.60637C9.28265 -1.60637 6.20929 -0.310761 3.98936 1.9029C1.76943 4.11656 0.470451 7.18137 0.470451 10.3777C0.470451 13.574 1.76943 16.6388 3.98936 18.8525C4.10785 18.9708 4.2264 19.0847 4.34736 19.1961V18.3003C4.23889 18.199 4.13242 18.0964 4.02683 17.9911C3.12565 17.0919 2.41055 16.0237 1.91977 14.8454C1.429 13.6671 1.17133 12.4027 1.16031 11.1229C1.14929 9.84307 1.38507 8.57372 1.85475 7.38624C2.32442 6.19877 3.01993 5.1184 3.90438 4.20343C5.67745 2.36963 8.09522 1.29961 10.6277 1.21408C13.1602 1.12855 15.6375 2.03532 17.5261 3.7323C19.4147 5.42928 20.5503 7.79259 20.6826 10.3077C20.815 12.8228 19.9342 15.2852 18.2547 17.1631C16.5753 19.0409 14.2217 20.1888 11.7069 20.3492C9.19209 20.5096 6.71982 19.7136 4.80651 18.1339V17.2216C6.60921 18.8324 8.98792 19.6754 11.4425 19.5302C13.897 19.385 16.1359 18.26 17.6834 16.4334C19.2309 14.6068 19.9604 12.2397 19.7087 9.88238C19.4569 7.52503 18.2477 5.37232 16.3666 3.917C14.4854 2.46168 12.086 1.8224 9.70979 2.12933C7.33359 2.43626 5.17226 3.66185 3.7112 5.5593C2.25014 7.45675 1.59724 9.86584 1.89174 12.2436C2.18624 14.6214 3.39259 16.7944 5.27359 18.2858V17.3571C3.58344 15.9613 2.55245 13.9645 2.37908 11.8104C2.2057 9.65627 2.90267 7.51915 4.31127 5.85462C5.71987 4.19009 7.72215 3.13909 9.87959 2.89882C12.037 2.65855 14.1943 3.24717 15.9195 4.55169C17.6447 5.85622 18.7858 7.77824 19.1078 9.91103C19.4297 12.0438 18.907 14.2163 17.6445 15.9601C16.382 17.7039 14.4849 18.8793 12.3507 19.2359C10.2166 19.5925 8.03774 19.1027 6.27916 17.8624V16.8751C7.89929 18.138 9.97353 18.6453 11.9975 18.2897V17.3318C10.214 17.5804 8.3927 17.0928 6.9733 16L6.20793 15.4237C6.09295 15.3393 5.97755 15.2493 5.86172 15.1539V14.1256C6.00214 14.2454 6.14339 14.3602 6.28549 14.4698L7.06879 15.0575C8.3629 16.0618 10.0186 16.4866 11.6397 16.222C13.2608 15.9573 14.7026 15.0272 15.6254 13.6546C16.5481 12.282 16.8738 10.5854 16.5332 8.9678C16.1926 7.35022 15.2153 5.9294 13.8328 5.03312C12.4504 4.13683 10.7736 3.83345 9.17174 4.18826C7.56993 4.54307 6.15875 5.52847 5.26786 6.91764C4.37696 8.3068 4.06756 9.98657 4.40367 11.6026C4.73978 13.2186 5.69468 14.6639 7.05975 15.5885V14.6012C5.91784 13.774 5.14911 12.5459 4.89485 11.1689C4.6406 9.79195 4.91988 8.36795 5.67237 7.1878C6.42486 6.00765 7.59216 5.15789 8.93648 4.81326C10.2808 4.46862 11.7016 4.65549 12.9219 5.33875C14.1421 6.02201 15.0731 7.15092 15.5391 8.496C16.0051 9.84108 15.9738 11.3145 15.4507 12.6367C14.9277 13.9588 13.952 15.0486 12.7036 15.6829C11.4553 16.3172 10.0313 16.4467 8.69323 16.0451V15.0372C9.8128 15.3402 11.0127 15.2036 12.0454 14.6565C13.0781 14.1094 13.8733 13.1931 14.2749 12.0902C14.6764 10.9872 14.6567 9.7738 14.2193 8.68605C13.7819 7.5983 12.9573 6.70722 11.9064 6.1903C10.8554 5.67337 9.65252 5.56733 8.52242 5.89192C7.39233 6.21651 6.40973 6.94922 5.76175 7.95441C5.11377 8.95961 4.84583 10.1654 5.0023 11.3574C5.15877 12.5493 5.73044 13.6522 6.62171 14.4698V13.4413C5.93529 12.7262 5.4917 11.7996 5.36092 10.8063C5.23014 9.81294 5.42001 8.80472 5.89835 7.92566C6.3767 7.04659 7.11596 6.34764 8.00534 5.92958C8.89471 5.51153 9.8922 5.39686 10.8518 5.60292C11.8115 5.80898 12.686 6.32562 13.344 7.07952C14.0019 7.83342 14.41 8.78368 14.5113 9.79322C14.6125 10.8028 14.4017 11.8193 13.9106 12.7103C13.4195 13.6014 12.6714 14.3207 11.7738 14.7644V13.7071C12.363 13.387 12.8386 12.8989 13.142 12.3041C13.4454 11.7092 13.5632 11.0343 13.4801 10.3676C13.397 9.70085 13.1167 9.07258 12.6727 8.55802C12.2287 8.04346 11.6392 7.66424 10.9827 7.46413C10.3262 7.26401 9.63047 7.25186 8.96736 7.429C8.30425 7.60615 7.70276 7.96834 7.24182 8.46991C6.78088 8.97148 6.48 9.58963 6.37513 10.2538C6.27026 10.918 6.3659 11.5981 6.644 12.2162V11.2123C6.48306 10.7935 6.42343 10.3392 6.47139 9.8905C6.51935 9.44179 6.67343 9.01287 6.9189 8.64353C7.16437 8.27418 7.49416 7.97512 7.87947 7.77307C8.26478 7.57102 8.69365 7.47214 9.12705 7.48464C9.56045 7.49713 9.9838 7.62061 10.3584 7.84365C10.733 8.06669 11.0471 8.38374 11.2741 8.76382C11.5011 9.1439 11.6339 9.57663 11.6597 10.0208C11.6856 10.465 11.6038 10.9099 11.4215 11.3143V10.2897C11.518 10.0341 11.5636 9.75902 11.5557 9.48265C11.5478 9.20628 11.4866 8.93481 11.3756 8.68526C11.2647 8.4357 11.1062 8.21341 10.9096 8.03175C10.713 7.85008 10.4827 7.71345 10.2317 7.62986C9.98071 7.54626 9.7144 7.51745 9.45077 7.54527C9.18715 7.57309 8.93087 7.65694 8.69987 7.79166C8.46886 7.92639 8.26803 8.10932 8.1094 8.32878C7.95077 8.54825 7.8378 8.80013 7.77642 9.06918V8.03311C7.97077 7.66642 8.26184 7.35941 8.61902 7.14463C8.9762 6.92985 9.38467 6.81614 9.80025 6.81614C10.2158 6.81614 10.6243 6.92985 10.9815 7.14463C11.3386 7.35941 11.6297 7.66642 11.8241 8.03311V6.998C9.94359 5.67354 7.42639 6.0251 5.9608 7.82018C4.49521 9.61526 4.84846 12.1428 6.644 13.5102V8.03311C6.644 8.03311 6.644 8.03311 6.644 8.03311ZM8.72231 13.5102V10.4399C8.72231 10.4399 8.72231 10.4399 8.72231 10.4399C8.72231 10.4399 8.72231 10.4399 8.72231 10.4399V10.4399L8.72231 13.5102Z" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Links columns */}
            <div>
              <h3 className="text-white font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-white/70 hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="text-white/70 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/gallery" className="text-white/70 hover:text-white transition-colors">Story Gallery</Link></li>
                <li><Link to="/themes" className="text-white/70 hover:text-white transition-colors">Story Themes</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-white/70 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/careers" className="text-white/70 hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/blog" className="text-white/70 hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/parents" className="text-white/70 hover:text-white transition-colors">Parents' Corner</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-white/70 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-white/70 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/faq" className="text-white/70 hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="/contact" className="text-white/70 hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom footer */}
        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} StoryTeller. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Help Center</a>
            <span className="text-white/40">•</span>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Email Support</a>
            <span className="text-white/40">•</span>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;