const branches = ["CSE", "CE", "AI&ML", "IoT", "EE"];

const branchCodes = {
  "CSE": "01",
  "CE": "02",
  "AI&ML": "03",
  "IoT": "04",
  "EE": "05"
};

const firstNames = [
  "Aman","Abhishek","Rahul","Rohit","Aditya","Ankit","Ashish","Arjun",
  "Aryan","Ayush","Vivek","Vishal","Saurabh","Shubham","Shivam","Kunal",
  "Nikhil","Neeraj","Piyush","Ravi","Rishabh","Raj","Rajat","Manish",
  "Mohit","Harsh","Himanshu","Deepak","Nitin","Naveen","Satyam","Sumit",
  "Suraj","Ujjwal","Varun","Vikas","Yash","Priya","Neha","Anjali",
  "Ananya","Sneha","Shreya","Simran","Pooja","Kajal","Komal","Nisha",
  "Riya","Ritika","Swati","Tanvi","Tanya","Muskan","Isha","Aditi"
];

const lastNames = [
  "Kumar","Singh","Verma","Sharma","Gupta","Yadav","Jha","Sinha",
  "Mishra","Prasad","Mehta","Pandey","Roy","Chaudhary","Kushwaha",
  "Thakur","Sah","Das","Patel","Raj","Kashyap","Srivastava","Tiwari",
  "Dubey","Khan","Agarwal","Ghosh","Jain","Rao","Choudhary"
];

export const students = Array.from({ length: 120 }, (_, index) => {
  const number = index + 1;

  const branchIndex = Math.floor(index / 24);
  const branch = branches[branchIndex];

  const serial = (index % 24) + 1;

  const section = ["A", "B", "C"][index % 3];

  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[(index * 7) % lastNames.length];

  const totalPoints = 10 + ((number * 13) % 91);
  const activitiesCount = 1 + ((number * 3) % 6);

  const pendingCertificates =
    number % 5 === 0 ? 1 : 0;

  const status =
    number % 17 === 0
      ? "Pending Verification"
      : "Active";

  return {
    id: `STU-${String(number).padStart(4, "0")}`,

    registrationNo:
      `25157${branchCodes[branch]}${String(serial).padStart(3, "0")}`,

    name: `${firstName} ${lastName}`,

    branch,

    section,

    semester: "3rd Semester",

    email:
      `${firstName.toLowerCase()}.${lastName.toLowerCase()}${number}@buildsphere.demo`,

    totalPoints,

    activitiesCount,

    pendingCertificates,

    status,
  };
});
