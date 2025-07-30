'use client';
import Navbar from '@/components/molecules/Navbar';
import Footer from '@/components/molecules/Footer';
import CartSection from '@/components/organisms/CartSection';
import { useContext } from 'react';
import { CartContext } from 'ui-old-version';
import { useEffect } from 'react';
import Additionals from '@/components/organisms/Aditionals';

export default function MyCart({ searchParams }) {
  // 3. Extraemos los IDs de los searchParams.
  const ids = searchParams.ids;
  const selectAditionals = searchParams.additionals;
  console.log('IDs from searchParams:', ids);
  const { cleanCartItems, handleAddOrRemoveProduct } = useContext(CartContext);

  const existsIds = (ids) => {
    cleanCartItems(); // Limpiamos el carrito antes de verificar los IDs
    // 2. Verificamos si los IDs existen en el carrito.
    if (ids) {
      const idArray = ids.split(',').map((id) => parseInt(id, 10));
      idArray.forEach((id) => {
        if (isNaN(id)) {
          console.error(`ID inválido: ${id}`);
        } else {
          // Aquí podrías agregar lógica para manejar cada ID, como agregar productos al carrito
          handleAddOrRemoveProduct(id);
        }
      });
    }
  };
  // 4. Verificamos si ambos IDs existen y, si es así, llamamos a la función.
  useEffect(() => {
    if (selectAditionals) {
      // Aquí podrías manejar la lógica para los adicionales si es necesario
      cleanCartItems(); // Limpiamos el carrito si es necesario
    }
    if (ids) {
      existsIds(ids);
    }
  }, [ids]);

  return (
    <main>
      <Navbar />

      {selectAditionals && <Additionals />}
      <CartSection withBack={!selectAditionals} />

      {!selectAditionals && ids && <Additionals />}
      <Footer />
    </main>
  );
}
