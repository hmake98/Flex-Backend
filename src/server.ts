import app from './app'
import { initDatabase } from './configs/db.config';
import { PORT } from './configs/keys';

app.listen(PORT, () => {
    console.log(`🚀 Server is up and running on port -> ${PORT}`)
    initDatabase();
}).on('error', (err) => {
    console.log(err);
});



