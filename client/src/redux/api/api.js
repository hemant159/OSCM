import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { server } from '../../constants/config';

const api = createApi({

    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: `${server}/api/v1/`}),

    tagTypes: ["Chats"],

    endpoints: (builder) => ({
        myChats: builder.query({
            query: () => ({
                url: "chat/my", 
                credentials: "include"
            }),
            providesTag: ["Chats"]
        })
    })
});

export default api;
export const { useMyChatsQuery } = api;