import mongoose from "mongoose";
import { envs } from "../../../common/envs";

const { mongoURI } = envs;

let tries = 0;

export const mongo = {
  start: async () => {
    try {
      tries++;
      await mongoose.connect(mongoURI);
      console.log("Conectado ao MongoDB com sucesso!");
    } catch (error) {
      console.error(`Erro ao conectar ao MongoDB (URI: ${mongoURI}):`, error);
      if (tries === 10) throw new Error('O servidor não conseguiu se conectar ao MongoDB!');
      setTimeout(mongo.start, 2000);
      console.log("Retentativa em 2000 ms!");
    }
  },
  stop: async () => {
    try {
      await mongoose.disconnect();
      console.log('MongoDB desconectado com sucesso!');
    } catch (error) {
      console.error('Erro ao desconectar do MongoDB:', error);
    }
  }
};
