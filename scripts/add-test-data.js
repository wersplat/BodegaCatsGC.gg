#!/usr/bin/env node

/**
 * Script to add test data to the backend API
 * This script adds the Bodega Cats team and related data to the backend
 */

const API_BASE_URL = 'https://api.bodegacatsgc.gg';

// Test data for Bodega Cats team
const bodegaCatsTeam = {
  name: "Bodega Cats",
  logo_url: "https://bodegacatsgc.gg/teams/bodega-cats-logo.png",
  description: "Street-smart gaming, bodega-style. Building something real in the NBA 2K Pro-Am ecosystem.",
  is_active: true
};

// Test data for Capitol City Cats team
const capitolCityCatsTeam = {
  name: "Capitol City Cats",
  logo_url: "https://bodegacatsgc.gg/teams/capitol-city-cats-logo.webp",
  description: "A competitive team from the capital region.",
  is_active: true
};

async function addTeam(teamData) {
  try {
    console.log(`Adding team: ${teamData.name}`);
    
    const response = await fetch(`${API_BASE_URL}/v1/teams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(teamData)
    });

    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Successfully added team: ${teamData.name}`);
      console.log(`   Team ID: ${result.id}`);
      return result;
    } else {
      const errorText = await response.text();
      console.log(`❌ Failed to add team ${teamData.name}: ${response.status} ${response.statusText}`);
      console.log(`   Error: ${errorText}`);
      return null;
    }
  } catch (error) {
    console.log(`❌ Error adding team ${teamData.name}:`, error.message);
    return null;
  }
}

async function checkExistingTeams() {
  try {
    console.log('Checking existing teams...');
    
    const response = await fetch(`${API_BASE_URL}/v1/teams`);
    
    if (response.ok) {
      const result = await response.json();
      console.log(`Found ${result.items?.length || 0} existing teams`);
      
      if (result.items && result.items.length > 0) {
        console.log('Existing teams:');
        result.items.forEach(team => {
          console.log(`  - ${team.name} (ID: ${team.id})`);
        });
      }
      
      return result.items || [];
    } else {
      console.log(`❌ Failed to check teams: ${response.status} ${response.statusText}`);
      return [];
    }
  } catch (error) {
    console.log('❌ Error checking teams:', error.message);
    return [];
  }
}

async function main() {
  console.log('🚀 Starting test data addition...\n');
  
  // Check existing teams first
  const existingTeams = await checkExistingTeams();
  
  // Check if Bodega Cats already exists
  const bodegaCatsExists = existingTeams.some(team => 
    team.name.toLowerCase().includes('bodega cats')
  );
  
  if (bodegaCatsExists) {
    console.log('✅ Bodega Cats team already exists in the database');
  } else {
    console.log('📝 Adding Bodega Cats team...');
    await addTeam(bodegaCatsTeam);
  }
  
  // Check if Capitol City Cats already exists
  const capitolCityCatsExists = existingTeams.some(team => 
    team.name.toLowerCase().includes('capitol city cats')
  );
  
  if (capitolCityCatsExists) {
    console.log('✅ Capitol City Cats team already exists in the database');
  } else {
    console.log('📝 Adding Capitol City Cats team...');
    await addTeam(capitolCityCatsTeam);
  }
  
  console.log('\n🔍 Final team check...');
  await checkExistingTeams();
  
  console.log('\n✨ Test data addition complete!');
  console.log('💡 Note: If teams were not added, the backend may require authentication.');
  console.log('   Check the backend documentation for authentication requirements.');
}

// Run the script
main().catch(console.error);
