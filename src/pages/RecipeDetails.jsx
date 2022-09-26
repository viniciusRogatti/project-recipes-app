import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { RecipeDetalsAPI } from '../services/fetchApi';

function RecipeDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [details, setDetails] = useState([]);
  console.log(pathname);

  useEffect(() => {
    const fetchDetails = async () => {
      setDetails(await RecipeDetalsAPI(pathname, id));
    };
    fetchDetails();
  }, [id, pathname]);
  // console.log(id);
  console.log(details);
  return (
    <div>
      {id}
    </div>
  );
}

export default RecipeDetails;
