import React, { useState, useEffect, ChangeEvent } from 'react';
import styled, { css } from 'styled-components';
import logoBottom from './nobucoffeelogo.png';


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 100%; // Added to ensure the wrapper covers the full viewport height
`;


const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  max-width: 50em;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  margin: 0 auto;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;
  width: 100%; /* add this line */
  max-width: 25em; /* change from pixels to em */
`;

const Label = styled.label`
  margin-right: 1rem;
  width: 5em; /* change from pixels to em */
  text-align: right; /* add this line */
`;
const TextDiv = styled.div`
  flex-shrink: 1; /* add this line */
`;

const Input = styled.input`
  width: 20em; 
  margin-right: 1rem;
`;

const Button = styled.button`
  width: 10rem; 
  height: 3rem; 
  border-radius: 0.5rem; 
  border: none;
  background-color: #95d4d6; 
  color: #554D50; 
  font-weight: bold; 
  cursor: pointer; 
  margin-top: 1rem;

  &:hover {
    background-color: #8bbbe4; // Slightly darker pastel blue color when hovering
  }
`;


const Result = styled.div`
  margin-top: 1rem;
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2rem;
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Link = styled.a`
  color: #333;
  text-decoration: none;
  font-weight: bold;
`;

const Recipe = styled.div`
  margin-top: 2rem;
`;

const FixedImage = styled.img`
  position: fixed;
  bottom: calc(5% - 2rem);
  right: 0;
  z-index: -1;
  height: auto;
`;

const StyledSelect = styled.select`
  background-color: #95d4d6; 
  color: #554D50; 
  font-weight: bold; // Bold font weight
  padding: 0.5rem; // Padding around the text
  border: none; // Remove default border
  border-radius: 0.5rem; // Add rounded corners
  cursor: pointer; // Cursor style

  &:focus {
    outline: none; // Remove default focus outline
  }
`;


interface CoffeeProfile {
  temperature: number;
  grindSize: number;
  taste: string;
  coffeeName?: string;
  suggestion: string;
}

function App() {
  const [temperature, setTemperature] = useState<number>(90);
  const [grindSize, setGrindSize] = useState<number>(0);
  const [taste, setTaste] = useState<string>('');
  const [suggestion, setSuggestion] = useState<string>('');
  const [profiles, setProfiles] = useState<CoffeeProfile[]>([]);
  const [coffeeName, setCoffeeName] = useState<string>('');

  useEffect(() => {
    document.title = "Pour Over";
    const savedProfiles = JSON.parse(localStorage.getItem('coffeeProfiles') || '[]') as CoffeeProfile[];
    setProfiles(savedProfiles);
  }, []);

  const saveProfile = () => {
    const newProfile: CoffeeProfile = { temperature, grindSize, taste, coffeeName, suggestion };
    const updatedProfiles = [...profiles, newProfile];
    setProfiles(updatedProfiles);
    localStorage.setItem('coffeeProfiles', JSON.stringify(updatedProfiles));
    setCoffeeName(''); // clear input field after saving
  };

  const handleTasteChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTaste(e.target.value);
    let suggestionText = '';

    if (e.target.value === 'bitter') {
      suggestionText = 'To make it less bitter, try coarsening the grind size or lowering the temperature.';
    } else if (e.target.value === 'sour') {
      suggestionText = 'To make it less sour, try making the grind size finer or increasing the temperature.';
    }

    setSuggestion(suggestionText);
  };

  return (
    <Wrapper>
      <Container>
        <h1>Pour Over Coffee Adjustments</h1>
        <InputContainer>
          <TextDiv>
            <Label htmlFor="coffeeName">Coffee Name:</Label>
          </TextDiv>
          <Input
            id="coffeeName"
            type="text"
            value={coffeeName}
            onChange={(e) => setCoffeeName(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <TextDiv>
            <Label htmlFor="temperature">Temperature:</Label>
          </TextDiv>

          <input
            id="temperature"
            type="range"
            min="70"
            max="100"
            step="1"
            value={temperature}
            onChange={(e) => setTemperature(parseInt(e.target.value, 10))}
          />
          <span>{temperature}°C</span>
        </InputContainer>
        <InputContainer>
          <TextDiv>
            <Label htmlFor="grindSize">Grind Size:</Label>
          </TextDiv>
          <input
            id="grindSize"
            type="range"
            min="0"
            max="30"
            step="0.1"
            value={grindSize}
            onChange={(e) => setGrindSize(parseFloat(e.target.value))}
          />
          <span>{grindSize}</span>
        </InputContainer>
        <h3>Taste Feedback</h3>
        <StyledSelect value={taste} onChange={handleTasteChange}>
          <option value="">--Select--</option>
          <option value="good">Good</option>
          <option value="bitter">Bitter</option>
          <option value="sour">Sour</option>
        </StyledSelect>
        <Result>
          {suggestion && (
            <>
              <h4>Suggestion       </h4>
              <p>{suggestion}</p>
            </>
          )}
        </Result>
        <Button onClick={saveProfile}>Save Profile</Button>
        <h2>Saved Profiles</h2>
        <ul>
          {profiles.map((profile, index) => (
            <li key={index}>
              {profile.coffeeName && profile.coffeeName + ', '}
              Temperature: {profile.temperature}°C, Grind Size: {profile.grindSize}, Taste: {profile.taste}
              {profile.suggestion && ( // Check if the suggestion exists and display it
                <>
                  <br />
                  Suggestion: {profile.suggestion}
                </>
              )}
            </li>
          ))}
        </ul>
        <TextDiv>
          <Recipe>
            <h2>Recipe</h2>
            <p>
              Here's the recipe we're following for our pour over:
            </p>
            <ol>
              <li>Grind 15g of coffee beans.</li>
              <li>Add 30g of water to the grounds, making sure to evenly saturate all the grounds.</li>
              <li>Allow the coffee to bloom for 30 seconds.</li>
              <li>Slowly pour an additional 120g of water over the coffee, pouring in a circular motion.</li>
              <li>Finish with a total of 250g of water.</li>
            </ol>
          </Recipe>
        </TextDiv>
        <Footer>
          <p>
            Like this app? You can support me by donating on <Link href="https://ko-fi.com/stupidfatcat" target="_blank">Ko-fi</Link>!
          </p>
        </Footer>
        <FixedImage src={logoBottom} alt="Your image description" />
      </Container>
    </Wrapper>
  );
}

export default App;