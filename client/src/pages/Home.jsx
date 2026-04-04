// import { Link } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
// import {
//   DollarSign,
//   Users,
//   Zap,
//   Shield,
//   ArrowRight,
//   LogIn,
// } from "lucide-react";

// export default function Home() {
//   const { user } = useAuth();

//   const features = [
//     {
//       icon: DollarSign,
//       title: "Track Expenses",
//       description: "Easily log and track all shared expenses with your groups",
//     },
//     {
//       icon: Users,
//       title: "Smart Splitting",
//       description: "Split expenses equally or with custom amounts",
//     },
//     {
//       icon: Zap,
//       title: "Instant Settlement",
//       description: "Get clear balances and settle debts quickly",
//     },
//     {
//       icon: Shield,
//       title: "Secure & Private",
//       description: "Your data is encrypted and kept private",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Navbar */}
//       <nav className="sticky top-0 z-40 bg-white border-b border-gray-200">
//         <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
//           <div className="flex items-center gap-2">
//             <div className="p-2 bg-blue-500 rounded-lg">
//               <DollarSign size={20} className="text-white" />
//             </div>
//             <h1 className="text-xl font-bold text-gray-900">SplitEase</h1>
//           </div>
//           <div className="flex items-center gap-3">
//             {user ? (
//               <Link to="/dashboard" className="btn-primary">
//                 Go to Dashboard
//               </Link>
//             ) : (
//               <>
//                 <Link to="/login" className="btn-outline">
//                   Sign in
//                 </Link>
//                 <Link to="/register" className="btn-primary">
//                   Get started
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="max-w-6xl mx-auto px-6 py-20">
//         <div className="max-w-3xl mx-auto text-center mb-16">
//           <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
//             Split expenses the smart way
//           </h2>
//           <p className="text-xl text-gray-600 mb-8 leading-relaxed">
//             Track shared expenses with friends, roommates, or colleagues.
//             Calculate balances instantly and settle debts with ease.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             {user ? (
//               <Link
//                 to="/dashboard"
//                 className="btn-primary py-3 px-8 text-lg inline-flex items-center justify-center gap-2"
//               >
//                 Open Dashboard
//                 <ArrowRight size={20} />
//               </Link>
//             ) : (
//               <>
//                 <Link
//                   to="/register"
//                   className="btn-primary py-3 px-8 text-lg inline-flex items-center justify-center gap-2"
//                 >
//                   Start free
//                   <ArrowRight size={20} />
//                 </Link>
//                 <Link
//                   to="/login"
//                   className="btn-outline py-3 px-8 text-lg inline-flex items-center justify-center gap-2"
//                 >
//                   <LogIn size={20} />
//                   Sign in
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="bg-gray-50 py-20">
//         <div className="max-w-6xl mx-auto px-6">
//           <h3 className="text-3xl font-bold text-gray-900 text-center mb-16">
//             Why choose SplitEase?
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {features.map((feature, idx) => {
//               const Icon = feature.icon;
//               return (
//                 <div key={idx} className="card">
//                   <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
//                     <Icon size={24} className="text-blue-600" />
//                   </div>
//                   <h4 className="text-lg font-semibold text-gray-900 mb-2">
//                     {feature.title}
//                   </h4>
//                   <p className="text-gray-600">{feature.description}</p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="bg-linear-to-r from-blue-500 to-blue-600 py-20">
//         <div className="max-w-4xl mx-auto text-center px-6">
//           <h3 className="text-4xl font-bold text-white mb-6">
//             Ready to stop worrying about money?
//           </h3>
//           <p className="text-xl text-blue-100 mb-8">
//             Join thousands of groups managing expenses effortlessly
//           </p>
//           {!user && (
//             <Link
//               to="/register"
//               className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
//             >
//               Create free account
//               <ArrowRight size={20} />
//             </Link>
//           )}
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-400 py-12">
//         <div className="max-w-6xl mx-auto px-6 text-center">
//           <p>&copy; 2024 SplitEase. All rights reserved.</p>
//           <div className="mt-4 space-x-6 text-sm">
//             <a href="#" className="hover:text-white transition-colors">
//               Privacy Policy
//             </a>
//             <a href="#" className="hover:text-white transition-colors">
//               Terms of Service
//             </a>
//             <a href="#" className="hover:text-white transition-colors">
//               Contact
//             </a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// import { FiUsers, FiZap, FiLogOut } from "react-icons/fi";
// import { FaSquareFull } from "react-icons/fa6";
// import { MdElectricBolt } from "react-icons/md";
// import { Link } from "react-router-dom";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
//       <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//           <div className="flex items-center gap-2">
//             <div className="w-6 h-6 bg-blue-500 rounded-md"></div>
//             <span className="font-bold text-gray-900">Expense Splitter</span>
//           </div>
// <div className="flex items-center gap-3">
//   <Link to="/login">
//     <button className="px-4 py-2 text-gray-700 font-medium hover:text-gray-900 cursor-pointer">
//       Login
//     </button>
//   </Link>
//   <Link to="/register">
//     <button className="px-6 py-2 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 cursor-pointer">
//       Sign Up
//     </button>
//   </Link>
// </div>
//         </div>
//       </nav>

//       <section className="max-w-7xl mx-auto px-6 py-24">
//         <div className="text-center mb-20">
//           <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight text-balance">
//             Split Expenses the Smart Way
//           </h1>
//           <p className="text-lg text-gray-600 mb-8 leading-relaxed text-balance max-w-3xl mx-auto">
//             Keep track of shared expenses with friends, family, and roommates.{" "}
//             <br />
//             Settle debts instantly with smart calculations.
//           </p>
//           <div className="flex gap-4 justify-center flex-wrap">
//             <button className="px-8 py-3 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800">
//               Get Started Free
//             </button>

//             <button className="px-8 py-3 bg-white text-gray-900 border-2 border-gray-900 rounded-md font-medium hover:bg-gray-50">
//               Sign in
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
//           {/* Create Groups Card */}
//           <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
//             <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
//               <FiUsers className="text-blue-500 text-2xl" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-3">
//               Create Groups
//             </h3>
//             <p className="text-gray-600">
//               Organize expenses by group - trips, roommates, events, or anything
//               else
//             </p>
//           </div>

//           <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
//             <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
//               <div className="text-green-500 text-2xl">💰</div>
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-3">
//               Track Expenses
//             </h3>
//             <p className="text-gray-600">
//               Add expenses and split them equally or customize the split for
//               each person
//             </p>
//           </div>

//           <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
//             <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
//               <MdElectricBolt className="text-red-500 text-2xl" />
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-3">
//               Settle Instantly
//             </h3>
//             <p className="text-gray-600">
//               Calculate who owes whom and settle debts with real-time balance
//               updates
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="bg-white py-20">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
//             How it Works
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
//                 1
//               </div>
//               <h3 className="text-lg font-bold text-gray-900 mb-3">
//                 Create a Group
//               </h3>
//               <p className="text-gray-600 text-sm">
//                 Set up a group for your trip, event, or recurring expenses
//               </p>
//             </div>

//             <div className="text-center">
//               <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
//                 2
//               </div>
//               <h3 className="text-lg font-bold text-gray-900 mb-3">
//                 Add Members
//               </h3>
//               <p className="text-gray-600 text-sm">
//                 Invite friends and family to join the group
//               </p>
//             </div>

//             <div className="text-center">
//               <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
//                 3
//               </div>
//               <h3 className="text-lg font-bold text-gray-900 mb-3">
//                 Log Expenses
//               </h3>
//               <p className="text-gray-600 text-sm">
//                 Record who paid and how to split the expense
//               </p>
//             </div>

//             <div className="text-center">
//               <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 mx-auto">
//                 4
//               </div>
//               <h3 className="text-lg font-bold text-gray-900 mb-3">
//                 Settle Up
//               </h3>
//               <p className="text-gray-600 text-sm">
//                 See who owes whom and settle the balance
//               </p>
//             </div>
//           </div>

//           <div className="text-center mt-16">
//             <button className="px-8 py-3 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800">
//               Start Splitting Expenses Today
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-300 py-12">
//         <div className="max-w-7xl mx-auto px-6 text-center">
//           <p className="mb-6">
//             &copy; 2026 Expense Splitter. All rights reserved.
//           </p>
//           <div className="flex gap-6 justify-center text-sm">
//             <a href="#" className="hover:text-white transition-colors">
//               Privacy Policy
//             </a>
//             <a href="#" className="hover:text-white transition-colors">
//               Terms of Service
//             </a>
//             <a href="#" className="hover:text-white transition-colors">
//               Contact
//             </a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

import React from "react";
import {
  FaUsers,
  FaReceipt,
  FaBolt,
  FaPlus,
  FaUserPlus,
  FaEdit,
  FaMoneyBillWave,
  FaChevronRight,
} from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="shrink-0 flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <FaReceipt className="text-white text-lg" />
                </div>
                <span className="font-bold text-gray-900">
                  Expense Splitter
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login">
                <button className="px-4 py-2 text-gray-700 font-medium hover:text-gray-900 cursor-pointer">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="px-6 py-2 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 cursor-pointer">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-linear-to-b from-blue-50/50 to-white pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span>Welcome to Expense Splitter</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Split Expenses
            <br />
            the <span className="text-blue-600">Smart Way</span>
          </h1>

          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-8">
            Keep track of shared expenses with friends, family, and roommates.
            Settle debts instantly with intelligent calculations.
          </p>

          <div className="flex items-center justify-center gap-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
              Get Started Free
              <FaChevronRight className="text-sm" />
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors">
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Powerful Features
            </h2>
            <p className="text-gray-500">
              Everything you need to manage shared expenses effortlessly
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <FaUsers className="text-white text-xl" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Create Groups
              </h3>
              <p className="text-gray-600 text-sm">
                Organize expenses by group - trips, roommates, events, or
                anything else. Simple and intuitive.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-green-50/50 rounded-xl p-6 border border-green-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <FaReceipt className="text-white text-xl" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Track Expenses
              </h3>
              <p className="text-gray-600 text-sm">
                Add expenses and split them equally, by percentage, or with
                custom amounts for each person.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-purple-50/50 rounded-xl p-6 border border-purple-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <FaBolt className="text-white text-xl" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Settle Instantly
              </h3>
              <p className="text-gray-600 text-sm">
                Calculate who owes whom with real-time balance updates and make
                payments as settled.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              How it Works
            </h2>
            <p className="text-gray-500">
              4 simple steps to manage your shared expenses
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow text-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Create a Group
              </h3>
              <p className="text-gray-600 text-sm">
                Set up a group for your trip, event, or regular expenses
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow text-center relative">
              <div className="hidden md:block absolute top-1/2 -left-3 transform -translate-y-1/2">
                <FaChevronRight className="text-gray-300" />
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Add Members</h3>
              <p className="text-gray-600 text-sm">
                Invite friends and family to join the group
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow text-center relative">
              <div className="hidden md:block absolute top-1/2 -left-3 transform -translate-y-1/2">
                <FaChevronRight className="text-gray-300" />
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Log Expenses</h3>
              <p className="text-gray-600 text-sm">
                Record who paid and how to split the expense
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow text-center relative">
              <div className="hidden md:block absolute top-1/2 -left-3 transform -translate-y-1/2">
                <FaChevronRight className="text-gray-300" />
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Settle Up</h3>
              <p className="text-gray-600 text-sm">
                See who owes who and settle the balances instantly
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-b from-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-linear-to-br from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-3">
              Ready to Simplify Expenses?
            </h2>
            <p className="text-blue-100 mb-8 max-w-md mx-auto">
              Start splitting expenses today. It's free and takes less than a
              minute.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2">
              Get Started Now
              <FaChevronRight className="text-sm" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>© 2026 Expense Splitter. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
