require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

app.use('/api/users', require('./routes/UserRoutes'));
app.use('/api/campaigns', require('./routes/CampaignRoutes'));
app.use('/api/donations', require('./routes/DonationRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use(require('./middlewares/errorHandler'));

const PORT = process.env.PORT || 3000;
const ASCII_ART = `
 /\\                 /\\
/ '\\._   (\\_/)   _.'/ \\
|.''._'--(o.o)--'_.''.|
\\_ / \`= ;/ " \\=;\` \\ _/
  \\__|__ \\___/ |__/
        \\(_|_)/
         " \` "
`;

app.listen(PORT, () => {
  console.log(ASCII_ART);
  console.log(`𓅔  The Owl is Listening on http://localhost:${PORT}`);
});