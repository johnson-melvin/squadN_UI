import axiosInstance from './interceptor';

export interface Sport {
    id: number;
    name: string;
    description?: string;
    icon?: string;
}

export interface UserSport {
    sportId: number;
    skillLevel: number;
}

export const sportsApi = {
    getAllSports: async (): Promise<Sport[]> => {
        const response = await axiosInstance.get('/sports');
        return response.data;
    },

    getUserSports: async (): Promise<UserSport[]> => {
        const response = await axiosInstance.get('/sports/user');
        return response.data;
    },

    updateUserSports: async (sports: UserSport[]): Promise<void> => {
        await axiosInstance.put('/sports/user', { sports });
    },
}; 