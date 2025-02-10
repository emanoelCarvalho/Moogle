import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class CrawlerService {
    async crawl(url: string) {
        try {
            const {data} = await axios.get(url);
            const $ = cheerio.load(data); 

            const pageTitle = $('title').text();
            let links: string[] = [];

            $('a').each((_, element) => {
                const href = $(element).attr('href');

                if (href && href.startsWith('http')) {
                    links = [...links, href];
                }
            }); 

            return {
                url, 
                title: pageTitle,
                links
            }; 
        } catch (error) {
            console.error(`Error crawling ${url}: `, error.message);
            return null;
        }
    }
}
