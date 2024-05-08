 
 

async function getEmployees(db) {
  const empCol = collection(db, 'users')
  const empSnapshot = await getDocs(empCol)
  return empSnapshot
}

function showData(employee) {
  console.log(employee.data().name + "  =====  " + employee.data().age);

}
 


 
export {
  getEmployees,  showData
  };  