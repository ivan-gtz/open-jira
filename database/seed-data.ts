interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}



export const seedData: SeedData = {
    entries: [
        {
            description: 'Pendiente: Cupidatat sit magna deserunt elit deserunt.',
            status: 'pending',
            createdAt: Date.now(),
        },
        {   
            description: 'En-Progreso: Minim sunt esse occaecat exercitation irure anim minim amet.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,
        },
        { 
            description: 'Terminadas: Eiusmod nisi ea aute occaecat.',
            status: 'finished',
            createdAt: Date.now() - 100000,
        },
    ]
}