import axios from 'axios'
import '../interfaces.ts'
import { Info } from '../interfaces.ts';

export async function getAllCharacters(){
    let data : Info<any>;
    const link = process.env.REACT_APP_ALLCHARACTERS
    return await axios.get(`${link}`)
                            .then((prop)=> {
                                console.log('Collected data succesfully for all characters', ' with code :',prop.status);
                                data = prop.data;
                                return data;
                            })
}

export async function getCharacterPage(pageNumber: number){
    const envLink = process.env.REACT_APP_CHARACTERLINK;
    const link = `${envLink}${pageNumber}`
    return await axios.get(`${link}`)
                        .then((prop)=> {
                            const data:Info<any> = prop.data;
                            return data;
                        })
}

export async function getCharacterSearch(search:string){
    const envLink = process.env.REACT_APP_LINK;
    const link = `${envLink}${search}`
    return await axios.get(`${link}`)
                        .then((prop)=> {
                            const data:Info<any> = prop.data;
                            return data;
                        })
                        .catch((error)=>{
                            console.error(error)
                            return axios.get(`${process.env.REACT_APP_ALLCHARACTERS}`).then((prop)=>{ return prop.data})
                        })
}





