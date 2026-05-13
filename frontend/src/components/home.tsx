

//El archivo Home.tsx esta completamente hacho con IA, en la siguente actividad se realizara desde 0

import { useEffect, useState } from "react";
import { getPokemon, type Pokemon } from "../services/pokemon.Service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function Home() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemons = async () => {
            const data = await getPokemon(20); // Traemos los primeros 151
            setPokemons(data);
            setLoading(false);
        };

        fetchPokemons();
    }, []);

    const getPokemonId = (url: string) => {
        const parts = url.split('/');
        return parts[parts.length - 2];
    };

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-8">
            <header className="space-y-4 text-center">
                <h1 className="text-5xl font-black tracking-tight text-red-600">Pokedex</h1>
            </header>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {loading ? (
                    Array.from({ length: 15 }).map((_, i) => (
                        <Card key={i} className="overflow-hidden">
                            <CardHeader className="p-4 flex flex-col items-center">
                                <Skeleton className="h-24 w-24 rounded-full" />
                            </CardHeader>
                            <CardContent className="p-4 pt-0 space-y-2">
                                <Skeleton className="h-3 w-12 mx-auto" />
                                <Skeleton className="h-5 w-24 mx-auto" />
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    pokemons.map((pokemon) => {
                        const id = getPokemonId(pokemon.url);
                        return (
                            <Card 
                                key={pokemon.name} 
                                className="group hover:border-red-500 transition-all duration-300 cursor-pointer overflow-hidden shadow-sm hover:shadow-md transform hover:-translate-y-1"
                            >
                                <CardHeader className="p-4 flex flex-col items-center bg-gray-50/50 group-hover:bg-red-50/50 transition-colors">
                                    <div className="relative h-24 w-24">
                                        <img 
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} 
                                            alt={pokemon.name}
                                            className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4 text-center">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">#{id.padStart(3, '0')}</span>
                                    <CardTitle className="text-lg font-bold capitalize text-gray-800 mt-1">{pokemon.name}</CardTitle>
                                </CardContent>
                            </Card>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default Home;
