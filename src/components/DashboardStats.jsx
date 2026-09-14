import { useState, useEffect, use } from 'react';
import { getComments, getAlbums, getPhotos, getTodos, getUsers } from '../api/apiService';

export default function DashboardStats() {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [comments, albums, photos, todos, users] = await Promise.all([
                    getComments(),
                    getAlbums(),
                    getPhotos(),
                    getTodos(),
                    getUsers()
                ]);
                setStats({
                    comments: comments.data.length,
                    albums: albums.data.length,
                    photos: photos.data.length,
                    todos: todos.data.length,
                    users: users.data.length
                });

            } catch (error) {
                console.error('Error al cargar las estadísticas:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;
    return (
        <div className="row text-cener">
            <h4 className="text-center mb-4">Resumen de JSONPlaceholder</h4>
            {Object.entries(stats).map(([key, value]) => (
                <div key={key} className="col-md-4 mb-3">
                    <div className="card bg-light shadow-sm py-3">
                        <h5 className="text-capitalize">{key}</h5>
                        <h2 className="text-success">{value}</h2>

                    </div>
                </div>
            ))}
        </div>


    );
}