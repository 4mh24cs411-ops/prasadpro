import { jsPDF } from 'jspdf';

/**
 * Export a generated meal plan as a PDF document
 */
export function exportMealPlanPDF(mealPlan, userProfile) {
  const doc = new jsPDF();
  const titleColor = '#10B981'; // Emerald
  const textColor = '#1E293B';
  const subtextColor = '#64748B';

  // Header
  doc.setFontSize(22);
  doc.setTextColor(titleColor);
  doc.text('FitGen AI - Personalized Meal Plan', 14, 20);

  doc.setFontSize(10);
  doc.setTextColor(subtextColor);
  doc.text(`Generated on: ${new Date().toLocaleDateString()} | User: ${userProfile?.name || 'User'}`, 14, 27);
  doc.text(`Goal: ${userProfile?.goal || 'Maintenance'} | Diet: ${userProfile?.dietary || 'Standard'}`, 14, 33);

  doc.setLineWidth(0.5);
  doc.setDrawColor(200, 200, 200);
  doc.line(14, 37, 196, 37);

  let y = 46;

  // Macros Overview Table Header
  doc.setFontSize(14);
  doc.setTextColor(textColor);
  doc.text('Daily Nutrition Summary', 14, y);
  y += 8;

  const totalCalories = mealPlan.reduce((acc, m) => acc + (m.calories || 0), 0);
  const totalProtein = mealPlan.reduce((acc, m) => acc + (m.protein || 0), 0);
  const totalCarbs = mealPlan.reduce((acc, m) => acc + (m.carbs || 0), 0);
  const totalFat = mealPlan.reduce((acc, m) => acc + (m.fat || 0), 0);

  doc.setFontSize(11);
  doc.setTextColor('#0F172A');
  doc.text(`Total Calories: ${totalCalories} kcal  |  Protein: ${totalProtein}g  |  Carbs: ${totalCarbs}g  |  Fat: ${totalFat}g`, 14, y);
  y += 12;

  doc.line(14, y - 4, 196, y - 4);

  // Meal Items Breakdown
  doc.setFontSize(14);
  doc.setTextColor(textColor);
  doc.text('Meal Schedule', 14, y);
  y += 10;

  mealPlan.forEach((meal) => {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#047857');
    doc.text(`• ${meal.type.toUpperCase()}: ${meal.title}`, 14, y);
    y += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor('#475569');
    doc.text(`Calories: ${meal.calories} kcal | Protein: ${meal.protein}g | Carbs: ${meal.carbs}g | Fat: ${meal.fat}g | Prep Time: ${meal.prepTime || '15 mins'}`, 18, y);
    y += 6;

    if (meal.description) {
      const splitDesc = doc.splitTextToSize(`Details: ${meal.description}`, 175);
      doc.text(splitDesc, 18, y);
      y += splitDesc.length * 5;
    }

    if (meal.ingredients && meal.ingredients.length > 0) {
      const ingText = doc.splitTextToSize(`Ingredients: ${meal.ingredients.join(', ')}`, 175);
      doc.setTextColor('#334155');
      doc.text(ingText, 18, y);
      y += ingText.length * 5;
    }

    y += 6;
  });

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text(`Page ${i} of ${pageCount} - FitGen AI Nutrition Assistant`, 14, 288);
  }

  doc.save(`FitGen_MealPlan_${new Date().toISOString().slice(0, 10)}.pdf`);
}

/**
 * Export shopping grocery list as a PDF document
 */
export function exportGroceryListPDF(groceryList) {
  const doc = new jsPDF();
  const titleColor = '#3B82F6'; // Blue

  doc.setFontSize(22);
  doc.setTextColor(titleColor);
  doc.text('FitGen AI - Smart Grocery List', 14, 20);

  doc.setFontSize(10);
  doc.setTextColor('#64748B');
  doc.text(`Generated on: ${new Date().toLocaleDateString()} | Total Items: ${groceryList.length}`, 14, 27);

  doc.setLineWidth(0.5);
  doc.setDrawColor(200, 200, 200);
  doc.line(14, 32, 196, 32);

  let y = 42;

  // Group by category
  const categories = ['Vegetables', 'Fruits', 'Protein', 'Dairy', 'Grains', 'Spices', 'Other'];
  const categorized = {};

  categories.forEach(cat => {
    categorized[cat] = groceryList.filter(item => (item.category || 'Other') === cat);
  });

  categories.forEach(cat => {
    const items = categorized[cat];
    if (items && items.length > 0) {
      if (y > 260) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor('#1E293B');
      doc.text(cat.toUpperCase(), 14, y);
      y += 6;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);

      items.forEach(item => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        const status = item.completed ? '[X]' : '[  ]';
        const text = `${status} ${item.name} (${item.quantity || '1 unit'}) ${item.note ? '- ' + item.note : ''}`;
        doc.setTextColor(item.completed ? '#94A3B8' : '#334155');
        doc.text(text, 18, y);
        y += 6;
      });

      y += 4;
    }
  });

  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text(`Page ${i} of ${pageCount} - FitGen AI Grocery Planner`, 14, 288);
  }

  doc.save(`FitGen_GroceryList_${new Date().toISOString().slice(0, 10)}.pdf`);
}
