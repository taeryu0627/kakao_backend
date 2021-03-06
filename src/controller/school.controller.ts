import express, { Router } from 'express';
import SchoolModel from '../model/school.model'

type School = {
    name: string,
};

const router = express.Router();

router.get('/', async (req, res) => {
    const schools: SchoolModel[] = await SchoolModel.findAll();
    return res.status(200).json(schools);
});

router.get('/:schoolId', async (req, res) => {
    const { schoolId } = req.params;
    if (!schoolId) {
        return res.status(400).json();
    }
    const schoolIDNumber: number = parseInt(schoolId, 10);
    const school: SchoolModel | null = await SchoolModel.findByPk(schoolIDNumber);
    if (!school) {
        return res.status(404).json();
    }
    return res.status(200).json(school);
});

router.post('/', (req, res) => {
    const school = req.body as School;
    if (!school) {
        return res.status(400).json();
    }

    SchoolModel.create({
        name: school.name,
    });

    return res.status(201).json();
})

export default router;