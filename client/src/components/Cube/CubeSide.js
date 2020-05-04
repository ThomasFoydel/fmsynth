// import React, { useContext, useState } from 'react';
// import PageRotation from 'components/Controls/PageRotation';
// import { GlobalContext } from 'context/GlobalContext';
// import {CTX} from

// const CubeSide = ({ children, side, pageTitle }) => {
//   const { currentPage } = useContext(GlobalContext);

//   let isCurrentPage;
//   if (currentPage === pageTitle) {
//     isCurrentPage = true;
//   }

//   return (
//     <div className={`side ${side} ${isCurrentPage && 'currentside'}`}>
//       {isCurrentPage && <PageRotation />}

//       {pageTitle === 'osc' && <Home isCurrentPage={isCurrentPage} />}
//       {pageTitle === 'fx' && <About isCurrentPage={isCurrentPage} />}
//       {pageTitle === 'contact' && <Contact isCurrentPage={isCurrentPage} />}
//       {pageTitle === 'products' && <Products isCurrentPage={isCurrentPage} />}
//       {pageTitle === 'login' && <Login isCurrentPage={isCurrentPage} />}
//       {pageTitle === 'dino' && <Register isCurrentPage={isCurrentPage} />}
//     </div>
//   );
// };

// export default CubeSide;
