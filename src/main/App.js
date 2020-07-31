import React from 'react';
import 'bootswatch/dist/lumen/bootstrap.css'
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'
import 'primeicons/primeicons.css'
import ProvedorAutenticacao from './ProvedorAutenticacao';
import Rotas from './Rotas';

function App() {
  return (
    <ProvedorAutenticacao>
      <div className="container">
        <Rotas />
      </div>
    </ProvedorAutenticacao>
  );
}

export default App;
