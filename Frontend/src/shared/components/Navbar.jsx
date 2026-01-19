import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/use-auth";
import { AuthModal } from "../../features/auth/ui/auth-modal"
import state from "../../store";
import { useSnapshot } from "valtio";
import CustomButton from "./CustomButton";
import React, {useState} from "react";
import { motion } from "framer-motion";
import {
  slideAnimation
} from '../../config/motion';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const snap = useSnapshot(state);

  const handleLogout = async () => {
    await logout();
    navigate("/");
    state.intro = true;
  };
  const handleGetStarted = () => {
    setShowAuthModal(true);
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
        <motion.div className="flex gap-5">
          <motion.header {...slideAnimation("down")}>
            <img
              src='./threejs.png'
              alt='logo'
              className="w-8 h-8 object-contain" 
            />
          </motion.header>
          <Link to="/" className="font-bold">
            T-Shirt Customizer
          </Link>
        </motion.div>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm">Welcome, {user.name}</span>
              <CustomButton
                title="Logout"
                handleClick={handleLogout}
                customStyles="bg-red-500 px-4 py-2.5 font-bold text-sm rounded hover:bg-red-600 transition-colors"
              />

              <div>
                {!snap.intro && (
                <CustomButton 
                  type="filled"
                  title="Go Back"
                  handleClick={() => state.intro = true}
                  customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                />
              )}
              </div>
            </div>
          ) : (
            <>
              {/* <button className="mx-2 hover:text-gray-300"
                handleClick={handleGetStarted}>
                Sign in
              </button> */}
              <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;