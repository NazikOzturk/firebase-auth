import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, emailVerification } from "../firebase";
import { logout as logoutHandle } from "../store/auth";
import { useNavigate } from "react-router-dom";
import UpdateProfile from "./components/UpdateProfile";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await logout();
    dispatch(logoutHandle());
    navigate("/login", {
      replace: true,
    });
  };

  useEffect(() => {
    console.log("Kullanıcı durumu değişti:", user);
  }, [user]);

  const handleVerification = async () => {
    await emailVerification();
  };

  if (user) {
    return (
      <div className="max-w-2xl mx-auto py-5">
        <h1 className="flex gap-x-4 items-center">
          {user.photoURL && (
            <img src={user.photoURL} className="w-7 h-7 rounded-full" />
          )}
          Oturum Açık ({user.email})
          <button
            onClick={handleLogout}
            className="h-8 rounded px-4 text-white bg-indigo-700"
          >
            Çıkış Yap
          </button>
          {!user.emailVerified && (
            <button
              onClick={handleVerification}
              className="h-8 rounded px-4 text-white bg-indigo-700"
            >
              E-Posta Onayla
            </button>
          )}
        </h1>
        <UpdateProfile />
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="flex gap-6">
          <Link
            to="/register"
            className="px-6 py-3 bg-indigo-700 text-white text-lg rounded-lg shadow-md hover:bg-indigo-800 transition duration-300"
          >
            Kayıt Ol
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 bg-green-600 text-white text-lg rounded-lg shadow-md hover:bg-green-700 transition duration-300"
          >
            Giriş Yap
          </Link>
        </div>
      </div>
    );
  }
}
