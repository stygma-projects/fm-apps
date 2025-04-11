import { defineStore } from 'pinia'
import {trpc} from "../api/trpc.ts";

export default defineStore('user', () => {
    const createUser = async () => {

    }

    const fetchUsers = async () => {
        const users = await trpc.user.list.query();
    }

    return {
        createUser
    }
})
