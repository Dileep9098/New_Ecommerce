// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { getTokenFromCookies } from '../Componants/utils/auth';

// const ProtectedRoute = ({ children }) => {
//   const token = getTokenFromCookies();
//   console.log("Kya haua bhai mere ",token)

//   if (!token) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;






// components/ProtectedRoute.jsx
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { isAuthenticated } from '../Componants/utils/auth';

// const ProtectedRoute = ({ children }) => {
//   if (!isAuthenticated()) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;




// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Navigate, useLocation } from "react-router-dom";
// import { loadUser } from "../../Store/Feature/auth/authSlice";

// const ProtectedRoute = ({ children }) => {
//     const { isLoading, isAuthentication, user } = useSelector((state) => state.auth);
//     const dispatch = useDispatch();
    

//     useEffect(() => {
//         dispatch(loadUser());

//     }, [dispatch]);
//     const location = useLocation();

//     if (!user) {
//         return <Navigate to="/" replace />;
//     }

//     if (location.pathname === "/admin/dashboard" && user.role == "admin") {
//         return <Navigate to="/admin/dashboard/" replace />;
//     }

//     return children;
// };

// export default ProtectedRoute;


// src/Helper/ProtectedRoute/ProtectedRoute.jsx
// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Navigate, useLocation } from "react-router-dom";
// import { loadUser } from "../../Store/Feature/auth/authSlice";

// const ProtectedRoute = ({ children, adminOnly = false }) => {
//   debugger
//   const dispatch = useDispatch();
//   const { user, isLoading, isAuthentication } = useSelector((state) => state.auth);
//   const location = useLocation();

//   useEffect(() => {
//     if (!isAuthentication) {
//       dispatch(loadUser());
//     }
//   }, [dispatch, isAuthentication]);

//   // Show loading indicator while checking auth
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   // If not authenticated
//   if (!user || !isAuthentication) {
//     // redirect to login, but keep the intended page in state so that after login you can redirect back
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   // If adminOnly route, check user role
//   if (adminOnly && user.role !== "admin") {
//     // redirect to home or unauthorized page
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;


// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Navigate, useLocation } from "react-router-dom";
// import { loadUser } from "../../Store/Feature/auth/authSlice";

// const ProtectedRoute = ({ children, adminOnly = false }) => {
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const { user, isLoading, isAuthentication } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (!user && !isAuthentication) {
//       dispatch(loadUser());
//     }
//   }, [dispatch, user, isAuthentication]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (!isAuthentication || !user) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   if (adminOnly && user.role !== "admin") {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;



// src/Helper/ProtectedRoute/ProtectedRoutes.jsx


import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
