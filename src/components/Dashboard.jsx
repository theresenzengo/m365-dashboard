// Remplacez le contenu de components/Dashboard.jsx par ceci (TEST)

import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const API_URL = "https://api-m365-licences-prod.azurewebsites.net/api/licences";

export default function DashboardTest() {
    const [status, setStatus] = useState("Initialisation...");

    useEffect(() => {
        setStatus("Tentative d'appel API...");
        
        const fetchLicences = async () => {
            try {
                const response = await fetch(API_URL);
                
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                
                const data = await response.json();
                setStatus("SUCCÈS : Données reçues. Première donnée: " + JSON.stringify(data).substring(0, 50) + "...");
                
            } catch (err) {
                console.error("Erreur de récupération de l'API:", err);
                setStatus("ÉCHEC de l'appel : " + err.message);
            }
        };

        fetchLicences();
    }, []);

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h5">Statut de l'API :</Typography>
            <Typography variant="h4" sx={{ mt: 2 }}>
                {status.includes("Tentative") && <CircularProgress size={20} sx={{ mr: 1 }} />}
                {status}
            </Typography>
            <Typography sx={{ mt: 2, color: 'red' }}>
                Si vous voyez ce message, l'useEffect s'exécute ! Vérifiez l'onglet Network.
            </Typography>
        </Box>
    );
}