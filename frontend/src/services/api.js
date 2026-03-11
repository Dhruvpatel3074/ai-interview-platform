const BASE_URL = "http://localhost:5000/api";

export const generateQuestions = async (
role,
company,
difficulty,
count
) => {

try{

const response = await fetch(
`${BASE_URL}/generate-questions`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
role,
company,
difficulty,
count
})
}
);

const data = await response.json();

return data.questions;

}catch(error){

console.log("Backend not ready — using mock questions");

/* fallback questions */

const mockQuestions = [
"Explain REST API.",
"What is JWT authentication?",
"Explain middleware in Express.",
"What is database indexing?",
"What is the difference between SQL and NoSQL?",
"What is CORS?",
"What is microservices architecture?",
"What is REST vs GraphQL?",
"What is rate limiting?",
"What is load balancing?"
];

/* return requested count */

return mockQuestions.slice(0,count);

}

};