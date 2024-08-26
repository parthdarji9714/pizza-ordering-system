import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PizzaSelectionComponent } from './pizza-selection.component';

describe('PizzaSelectionComponent', () => {
  let component: PizzaSelectionComponent;
  let fixture: ComponentFixture<PizzaSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PizzaSelectionComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzaSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total cost correctly without any offers', () => {
    component.selectedToppings['Small']['Tomatoes'] = true;
    component.selectedToppings['Small']['Onions'] = true;
    const total = component.calculateTotal();
    expect(total).toBe(6.5); // $5 (Small) + $1 (Tomatoes) + $0.50 (Onions)
    expect(component.appliedOffers.length).toBe(0);
  });

  it('should apply Offer 1 correctly (1 Medium Pizza with 2 toppings for $5)', () => {
    component.selectedToppings['Medium']['Tomatoes'] = true;
    component.selectedToppings['Medium']['Onions'] = true;
    const total = component.calculateTotal();
    expect(total).toBe(5); // Offer 1: $5
    expect(component.appliedOffers.length).toBe(1);
    expect(component.appliedOffers[0].description).toBe('Offer 1: 1 Medium Pizza with 2 toppings for $5');
  });

  it('should apply Offer 2 correctly (2 Medium Pizzas with 4 toppings each for $9)', () => {
    component.selectedToppings['Medium']['Tomatoes'] = true;
    component.selectedToppings['Medium']['Onions'] = true;
    component.selectedToppings['Medium']['Bell pepper'] = true;
    component.selectedToppings['Medium']['Mushrooms'] = true;

    // Simulate a second Medium pizza
    const secondMediumPizzaToppings = { ...component.selectedToppings['Medium'] };
    component.selectedToppings['Medium'] = {
      ...secondMediumPizzaToppings
    };

    const total = component.calculateTotal();
    expect(total).toBe(9); // Offer 2: $9
    expect(component.appliedOffers.length).toBe(1);
    expect(component.appliedOffers[0].description).toBe('Offer 2: 2 Medium Pizzas with 4 toppings each for $9');
  });

  it


  it('should apply Offer 3 correctly (1 Large Pizza with 4 toppings, 50% discount)', () => {
    component.selectedToppings['Large']['Tomatoes'] = true;
    component.selectedToppings['Large']['Onions'] = true;
    component.selectedToppings['Large']['Pepperoni'] = true;
    component.selectedToppings['Large']['Mushrooms'] = true;
    const total = component.calculateTotal();
    expect(total).toBe(6.5); // Offer 3: $13 / 2 = $6.50
    expect(component.appliedOffers[0].description).toBe('Offer 3: 1 Large Pizza with 4 toppings (50% discount)');
  });

  it('should not apply any offer if conditions are not met', () => {
    component.selectedToppings['Large']['Tomatoes'] = true;
    component.selectedToppings['Large']['Onions'] = true;
    const total = component.calculateTotal();
    expect(total).toBe(10); // $8 (Large) + $1 (Tomatoes) + $0.50 (Onions)
    expect(component.appliedOffers).toBeNull();
  });
});
