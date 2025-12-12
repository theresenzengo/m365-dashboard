
import React, { useRef } from 'react';
import { Box, Grid, Card, Typography, Button, AppBar, Toolbar } from '@mui/material';
import { AttachMoney, Inventory, CheckCircle } from '@mui/icons-material';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Chart as ChartJS, ArcElement, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Dashboard() {
  const dashboardRef = useRef();

  const exportPDF = () => {
    const input = dashboardRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('dashboard.pdf');
    });
  };

  const doughnutData = {
    labels: ['Business', 'Enterprise', 'E1', 'E3', 'E5'],
    datasets: [{ data: [40, 25, 15, 10, 10], backgroundColor: ['#1565C0', '#1E88E5', '#42A5F5', '#90CAF9', '#E3F2FD'] }]
  };

  const barData = {
    labels: ['HR', 'Finance', 'IT', 'Sales', 'Marketing'],
    datasets: [{ label: 'Coût (€)', data: [1200, 900, 1500, 800, 700], backgroundColor: '#1565C0' }]
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{ label: 'Coût mensuel (€)', data: [5000, 5200, 4800, 5300, 5500, 5400], borderColor: '#1E88E5', fill: false }]
  };

  return (
    <Box sx={{ backgroundColor: '#F4F6F8', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: '#1565C0' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Optimisation M365</Typography>
          <Button color="inherit" onClick={exportPDF}>Exporter PDF</Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 4 }} ref={dashboardRef}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1565C0' }}>Dashboard d'Optimisation</Typography>

        {/* KPIs */}
        <Grid container spacing={3}>
          {[{ title: 'Coût Total', value: '5 500 €', icon: <AttachMoney /> },
            { title: 'Licences inutilisées', value: '120', icon: <Inventory /> },
            { title: 'Économies potentielles', value: '1 200 €', icon: <CheckCircle /> }]
            .map((kpi, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{
                  p: 3, textAlign: 'center',
                  background: 'linear-gradient(135deg, #1565C0, #1E88E5)',
                  color: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)', boxShadow: '0 8px 30px rgba(0,0,0,0.3)' },
                  opacity: 0, animation: 'fadeIn 1s forwards'
                }}>
                  <Typography variant="h6">{kpi.icon} {kpi.title}</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{kpi.value}</Typography>
                </Card>
              </Grid>
            ))}
        </Grid>

        {/* Graphiques */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}><Card sx={{ p: 3 }}><Typography variant="h6">Répartition des licences</Typography><Doughnut data={doughnutData} /></Card></Grid>
          <Grid item xs={12} md={4}><Card sx={{ p: 3 }}><Typography variant="h6">Coût par département</Typography><Bar data={barData} /></Card></Grid>
          <Grid item xs={12} md={4}><Card sx={{ p: 3 }}><Typography variant="h6">Évolution des coûts</Typography><Line data={lineData} /></Card></Grid>
        </Grid>

        {/* Recommandations */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, color: '#1565C0' }}>Recommandations</Typography>
          <Card sx={{ p: 3 }}>
            <Typography>- Supprimer 50 licences inutilisées ✅</Typography>
            <Typography>- Downgrade 20 licences E5 → E3 💡</Typography>
            <Typography>- Réattribuer 10 licences inactives 🔄</Typography>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
