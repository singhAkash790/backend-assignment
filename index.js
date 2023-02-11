const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const Project = require("./models/productsModels");
const ProjectStatus = require("./models/productsModels");
const Campaigns = require("./models/productsModels");
const app = express();
// middleware
app.use(bodyParser.json());
app.use(express.json);

// Env configratiom
dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 5000;

//  body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup dataBase
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://clgDuniya:7906626073@cluster0.b3yotfm.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connect to mongooes");
  })
  .catch((error) => {
    console.log(error);
  });

// ---------------------------------Project Data---------------------------------------------------------//

// Create a new Project
app.post("/projects", async (req, res) => {
  try {
    const result = await Project.create(req.body);
    res.status(201).json(rs);
  } catch (error) {
    res.status(500).send({ error: "Failed to create Project" });
  }
});

// Get a list of all projects
app.get("/projects", async (req, res) => {
  try {
    const result = await Project.find({});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ error: "Failed to retrieve projects" });
  }
});

// Get a specific Project by id
app.get("/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Project.findById(id);
    if (result.length > 0) {
      res.send(result[0]);
    } else {
      res.status(404).send({ error: "Project not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to retrieve Project" });
  }
});

// Update a specific Project by id
app.put("/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Project.findByIdAndUpdate(id);
    if (result) {
      res.send({ success: true });
    } else {
      res.status(404).send({ error: "Project not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to update Project" });
  }
});

// Delete a specific Project by id
app.delete("/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await product.delete(id);
    if (result.affectedRows > 0) {
      res.send({ success: true });
    } else {
      res.status(404).send({ error: "Project not found" });
    }
  } catch (error) {}
});
// ---------------------------------------------------------------campagins---------------------------------------------------//

// Create a new Campaigns
app.post("/campaigns", async (req, res) => {
  try {
    const result = await Campaigns.create(req.body);
    res.status(201).json(Campaigns);
  } catch (error) {
    res.status(500).send({ error: "Failed to create Campaigns" });
  }
});

// Get a list of all campaigns
app.get("/campaigns", async (req, res) => {
  try {
    const result = await Campaigns.find({});
    res.send(result);
    result.open += 1;
    result.save((err) => {
      if (err) {
        return res.sendStatus(500);
      }
    });
  } catch (error) {
    res.status(500).send({ error: "Failed to retrieve campaigns" });
  }
});

// Get a specific Campaigns by id
app.get("/campaigns/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Campaigns.findById(id);
    if (result.length > 0) {
      res.send(result[0]);
      result.clicks += 1;
      result.save((err) => {
        if (err) {
          return res.sendStatus(500);
        }
      });
    } else {
      res.status(404).send({ error: "Campaigns not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to retrieve Campaigns" });
  }
});

// Update a specific Campaigns by id
app.put("/campaigns/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Campaigns.findByIdAndUpdate(id);
    if (result) {
      res.send({ success: true });
    } else {
      res.status(404).send({ error: "Campaigns not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to update Campaigns" });
  }
});

// Delete a specific Campaigns by id
app.delete("/campaigns/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Campaigns.delete(id);
    if (result.affectedRows > 0) {
      res.send({ success: true });
    } else {
      res.status(404).send({ error: "Project not found" });
    }
  } catch (error) {}
});
// ----------------------------------------------------------------------------------------------------------


app.get('/projectstats', async (req, res) => {
    const perPage = 5;
    const page = req.query.page || 1;
  
    const projects = await ProjectStatus.find()
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .populate('campaigns')
      .exec();
  
    const totalOpensRequired = projects.reduce((total, project) => {
      return total + project.target_opens;
    }, 0);
  
    const totalClicksRequired = projects.reduce((total, project) => {
      return total + project.target_clicks;
    }, 0);
  
    const totalOpenCost = projects.reduce((total, project) => {
      return total + (project.target_opens * project.open_cost);
    }, 0);
  
    const totalClickCost = projects.reduce((total, project) => {
      return total + (project.target_clicks * project.click_cost);
    }, 0);
  
    const totalCampaigns = projects.reduce((total, project) => {
      return total + project.Campaigns.length;
    }, 0);
  
    const totalOpensAchieved = projects.reduce((total, project) => {
      return total + project.Campaigns.reduce((subTotal, campaign) => {
        return subTotal + campaign.opens;
      }, 0);
    }, 0);
  
    const totalClicksAchieved = projects.reduce((total, project) => {
      return total + project.Campaigns.reduce((subTotal, campaign) => {
        return subTotal + campaign.clicks;
      }, 0);
    }, 0);
  
    res.send('projectstats', {
      projects: projects,
      totalOpensRequired: totalOpensRequired,
      totalClicksRequired: totalClicksRequired,
      totalOpenCost: totalOpenCost,
      totalClickCost: totalClickCost,
      totalCampaigns: totalCampaigns,
      totalOpensAchieved: totalOpensAchieved,
      totalClicksAchieved: totalClicksAchieved,
      currentPage: page,
      pages: Math.ceil(projects.length / perPage)
    });mongoose.isObjectIdOrHexStringPOL122
  });
  

app.get("/", (req, res) => {
  res.send("Curd application");
});

app.listen(PORT, () => {
  console.log(`server is running on: ${PORT}`);
});
