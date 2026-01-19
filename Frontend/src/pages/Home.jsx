import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { useNavigate } from 'react-router-dom';

import state from '../store';
import { CustomButton } from '../shared/components';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../config/motion';
import { AuthModal } from "../features/auth/ui/auth-modal";
import { useAuth } from "../features/auth/hooks/use-auth";

const Home = () => {
  const snap = useSnapshot(state);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      state.intro = false;
      navigate('/customizer');
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <AnimatePresence>
        {snap.intro && (
          <motion.div className="home" {...slideAnimation('left')}>
            <motion.div className="home-content" {...headContainerAnimation}>
              <motion.div {...headTextAnimation}>
                <h1 className="head-text">
                  LET'S <br className="xl:block hidden" /> DO IT.
                </h1>
              </motion.div>
              <motion.div
                {...headContentAnimation}
                className="flex flex-col gap-5"
              >
                <p className="max-w-md font-normal text-gray-600 text-base">
                  Create your unique and exclusive shirt with our brand-new 3D customization tool. <strong>Unleash your imagination</strong>{" "} and define your own style.
                </p>

                {isAuthenticated ? (
                  <div className="flex flex-col gap-3">
                    <p className="text-sm text-gray-700">
                      Welcome back, <strong>{user?.name}</strong>!
                    </p>
                    <CustomButton
                      type="filled"
                      title="Start Customizing"
                      handleClick={handleGetStarted}
                      customStyle="w-fit px-4 py-2.5 font-bold text-sm"
                    />
                  </div>
                ) : (
                  <CustomButton
                    type="filled"
                    title="Get Started"
                    handleClick={handleGetStarted}
                    customStyle="w-fit px-4 py-2.5 font-bold text-sm"
                  />
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}

export default Home;