import { derived, writable } from "svelte/store";
import { httpGet } from "../common/api";

// const users = writable([]);

// async function fetchUsers() {
//     const { data } = await httpGet("/users");
//     return data;
//   }

// export const usersStore = derived(
//     users,
//     ($users, set) => {
//         fetchUsers().then(data => set(data));

//         return () => {
//             set = () => {}
//         }
//     }, []);

    
export const users = writable([]);