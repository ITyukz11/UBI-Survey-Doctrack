// pages/api/documents.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { contract_id, designer } = req.query; // Get the search terms from the query parameters

      let documents;
      if (contract_id) {
        // If contract_id is provided, search by contract_id
        documents = await prisma.document.findMany({
          where: {
            contract_id: contract_id.toString(), // Assuming contract_id is a string
          },
        });
      } else if (designer) {
        // If designer is provided, search by designer
        documents = await prisma.document.findMany({
          where: {
            designer: designer.toString(), // Assuming designer is a string
          },
        });
      } else {
        // If no search terms are provided, fetch all documents
        documents = await prisma.document.findMany();
      }

      res.status(200).json(documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } 
   else if (req.method === 'POST') {
    try {
        const { region, contract_id, designer, file_location } = req.body;
        
        // Check if the contract ID already exists
        const existingDocument = await prisma.document.findFirst({
            where: {
                contract_id
            }
        });

        if (existingDocument) {
            return res.status(400).json({ error: 'Contract ID already exists', message: 'Contract ID already exists' });
        }
        
        // Create a new document
        const newDocument = await prisma.document.create({
            data: {
                region,
                contract_id,
                designer,
                file_location
            }
        });

        res.status(201).json({ success: 'Document created successfully', newDocument });
    } catch (error) {
        console.error('Error creating document:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
} else {
    res.status(405).json({ error: 'Method Not Allowed' });
}

}
