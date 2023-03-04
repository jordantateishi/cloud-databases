import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase/firebase.js';

const ProductList = () => {
  const products = firebase.firestore().collection('products');
  const recipes = firebase.firestore().collection('recipes');
  const ingredients = firebase.firestore().collection('ingredients');
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const unsubscribe = products.onSnapshot(async (snapshot) => {
      const productsData = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const recipesData = await Promise.all(
            doc.data().recipes.map(async (recipeId) => {
              const recipeDoc = await recipes.doc(recipeId).get();
              return {
                id: recipeId,
                ...recipeDoc.data()
              };
            })
          );
          return {
            id: doc.id,
            name: doc.data().name,
            recipes: recipesData
          };
        })
      );
      setProductList(productsData);
    });
    return unsubscribe;
  }, [products, recipes]);

  return (
    <div>
      {productList.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <ul>
            {product.recipes.map((recipe) => (
              <li key={recipe.id}>
                <h3>{recipe.name}</h3>
                <p>{recipe.description}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProductList;