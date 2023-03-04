import logo from './logo.svg';
import './App.css';
import { firebase } from './firebase/firebase.js'
import { getAuth, signInWithRedirect, getRedirectResult, GoogleAuthProvider, signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import Ingredient from './folder/ingredient.js';
import Recipe from './folder/recipe';
import Product from './folder/product';
import ProductList from './folder/list';
import RemoveIngredient from './folder/remove';
import EditIngredient from './folder/edit';
import { signIn, logOff } from './firebase/authentication.js';

const auth = getAuth();

function App() {
  const [ user ] = useAuthState(auth)
  return (
  <div>
    {user ? (

      <div>
          <p>Hello {user.displayName}</p>
          <label>Add ingredient:</label>
          <Ingredient/>
          <RemoveIngredient/>
          <EditIngredient/>
          <label>Add Recipe:</label>
          <Recipe/>
          <label>Add Product:</label>
          <Product/>
          <label>Products:</label>
          <ProductList/>
      </div>
    ) : (
      <div>
          <p>Sign in to begin</p>
      </div>
    )}
    <div>
        {user ? (

          <button onClick={logOff}>Sign out</button>
        ) : (
          <button onClick={signIn}>Sign in with Google</button>
        )}
    </div>
  </div>
  
  );
}

export default App;