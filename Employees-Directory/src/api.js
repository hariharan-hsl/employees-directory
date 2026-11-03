const employees_api = "https://dummyjson.com/users"

export const getEmployees = async(limit=30,skip=0)=>{
  const response = await fetch(`${employees_api}?limit=${limit}&skip=${skip}`);

  if(!response.ok){
    throw new Error ("Failed to fetch the employees please try again...")
  }

  const data = await response.json();

  // i get users and total-count
  return {
    employees:data.users,
    total:data.total,
  };

}

//   {
//      id: 1,
//     name: "Hariharan",
//     initials: "H",
//     designation: "Full Stack Developer",
//     department: "IT",
//     email: "hari@gmail.com",
//     phone: "9876543210",
//     status: "Active",
//     color:"#3268E8"
//   },
//   {
//     id: 2,
//     name: "Dhanush",
//     designation: "Sales Excuter",
//     department: "Sales",
//     email: "dhanush@example.com",
//     phone: "9876543211",
//     initials: "DH",
//     status: "Active",
//     color:"#D92D62"
//   },
//   {
//     id: 3,
//     name: "Saravana Kumar",
//     designation: "Mern Developer",
//     department: "IT",
//     email: "sararvana@example.com",
//     phone: "9876543212",
//     initials: "SK",
//     status: "Active",
//     color:"#10B981"
//   },
//   {
//     id: 4,
//     name: "Devi",
//     designation: "HR Manager",
//     department: "HR",
//     email: "devi@example.com",
//     phone: "9876543213",
//     initials: "DV",
//     status: "Inactive",
//     color:"#F59E0B"
//   },
//   {
//     id: 5,
//     name: "Hari",
//     designation: "Frontend Developer",
//     department: "IT",
//     email: "hari@example.com",
//     phone: "9876543214",
//     initials: "H",
//     status: "Active",
//     color:"#8B5CF6"
//   },
//   {
//     id: 6,
//     name: "Surya",
//     designation: "HR Manager",
//     department: "HR",
//     email: "surya@example.com",
//     phone: "9876543215",
//     initials: "SA",
//     status: "Active",
//     color:"#EF4444"
//   },
//   {
//     id: 7,
//     name: "Pravin",
//     designation: "Backend Developer",
//     department: "IT",
//     email: "arun@example.com",
//     phone: "9876543216",
//     initials: "AK",
//     status: "Inactive",
//     color:"#3268E8"
//   },
//   {
//     id: 8,
//     name: "Shakila",
//     designation: "Sales Excuter",
//     department: "Sales",
//     email: "shakila@example.com",
//     phone: "9876543217",
//     initials: "S",
//     status: "Active",
//     color:"#F59E0B"
//   },
//   {
//     id: 9,
//     name: "Harsha",
//     designation: "java Developer",
//     department: "IT",
//     email: "harsha@example.com",
//     phone: "9876543217",
//     initials: "HS",
//     status: "Active",
//     color:"#EF4444"
//   }
// ];

// export default employees;