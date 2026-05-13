export interface Pokemon {
    name: string;
    url: string;
}

export interface RespuestaApi {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
}

const URL = 'https://pokeapi.co/api/v2';

export const getPokemon = async (limit: number): Promise<Pokemon[]> => {
    try {
        const response = await fetch(`${URL}/pokemon?limit=${limit}`);
        if (!response.ok) {
            throw new Error('Error en la respuesta');
        }
        const data: RespuestaApi = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return [];
    }
};
