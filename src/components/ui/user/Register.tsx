// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";

// interface RegisterData {
//   email: string;
//   password: string;
// }

// const registerUser = async (data: RegisterData) => {
//   const response = await axios.post("/auth/register", data);
//   return response.data;
// };

// const RegisterForm = () => {
//   const [formState, setFormState] = useState<RegisterData>({
//     email: "",
//     password: "",
//   });
//   const [registerUserMutation, { status, data }] =
//     useMutation<RegisterData>(registerUser);

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     registerUserMutation(formState);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="email"
//         placeholder="Email"
//         value={formState.email}
//         onChange={(event) =>
//           setFormState({ ...formState, email: event.target.value })
//         }
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={formState.password}
//         onChange={(event) =>
//           setFormState({ ...formState, password: event.target.value })
//         }
//       />
//       <button type="submit">Register</button>
//     </form>
//   );
// };
