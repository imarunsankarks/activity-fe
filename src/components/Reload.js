import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Reload = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleReload = () => {
      navigate('/');
    };

    // Attach the event listener for page reload
    window.addEventListener('beforeunload', handleReload);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleReload);
    };
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default Reload;
