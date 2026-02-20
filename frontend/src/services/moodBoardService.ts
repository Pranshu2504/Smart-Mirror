import api from './api';

const getMoodBoards = async () => {
    const response = await api.get('/moodboards');
    return response.data;
};

const createMoodBoard = async (boardData: any) => {
    const response = await api.post('/moodboards', boardData);
    return response.data;
};

const deleteMoodBoard = async (id: string) => {
    const response = await api.delete(`/moodboards/${id}`);
    return response.data;
};

const moodBoardService = {
    getMoodBoards,
    createMoodBoard,
    deleteMoodBoard
};

export default moodBoardService;
