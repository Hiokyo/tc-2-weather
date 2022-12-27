import React from 'react';
import { Routes, Route } from 'react-router-dom';
import routes from '../routes';
import NotFound from '../pages/404';
import Header from '../components/molecules/Header/Header';


const Wrapper = () => {
    return (
        <Routes>
          {routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={(
                <React.Fragment>
                  <Header/>
                  <route.component />
                </React.Fragment>
              )}
            />
          );
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      );
    }


export default Wrapper