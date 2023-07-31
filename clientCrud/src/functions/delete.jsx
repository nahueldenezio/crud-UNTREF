export const deleteGuitar = async (guitarId, guitarData, setGuitarData) => {
    try {
      const response = await fetch(`http://localhost:3000/api/guitars/${guitarId}`, {
        method: "DELETE",
      });
      if (response.ok) {    
        const updatedData = guitarData.filter((guitar) => guitar._id !== guitarId);
        setGuitarData(updatedData);
      } else {
        console.error("Error deleting guitar:", response.status);
      }
    } catch (error) {
      console.error("Error deleting guitar:", error);
    }
  };