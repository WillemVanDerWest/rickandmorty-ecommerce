import axios from 'axios'
import '../interfaces.ts'
import { Episode, Info } from '../interfaces.ts';

interface searchPage{
    search: string;
    page?: number
}

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

export async function getCharacterSearch(search : string){
    const envLink = process.env.REACT_APP_LINK;
    let link;
    console.log(search)
    link = `${envLink}?${search}`
    console.log(link)
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

export async function getNextPage(link:string){
    
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

export async function getPrevPage(link:string){
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

export async function getEpisode(link:string){
    return await axios.get(`${link}`)
                        .then((prop)=> {
                            const data:Episode = prop.data;
                            return data;
                        })
                        .catch((error)=>{
                            console.error(error)
                            return error;
    })

}





