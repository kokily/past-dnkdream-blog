import './env';
import app from './app';

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Dnk Dream Backend Server on ${PORT} port`);
});
